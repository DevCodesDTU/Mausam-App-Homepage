"""responses.json              Stores the rules and data
mausam_response_engine.py   Creates the response
transcript.py               Saves the response
transcript.json             The saved result"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Mapping

from transcript import export_response


CONFIG_PATH = Path(__file__).with_name("responses.json")
DEFAULT_SAMPLE_ID = "mumbai_rainy_morning"
DEFAULT_PERSONA_ID = "farmer-rural"
DEFAULT_ACTIVITY_ID = "farming-ploughing-a-field"


__all__ = [
    "load_response_config",
    "expand_personas",
    "expand_activities",
    "get_sample_input",
    "get_persona",
    "get_activity",
    "generate_response",
    "generate_sample_response",
    "export_sample_response",
]

def load_response_config(file_path: str | Path | None = None) -> dict[str, Any]:
    """Load the JSON rulebook without producing console output."""
    path = Path(file_path) if file_path is not None else CONFIG_PATH
    with path.open("r", encoding="utf-8") as config_file:
        config = json.load(config_file)
    if not isinstance(config, dict):
        raise ValueError("responses.json must contain a JSON object.")
    return config


def _slug(value: str) -> str:
    cleaned = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return cleaned or "item"


def expand_personas(config: Mapping[str, Any]) -> list[dict[str, Any]]:
    """
    Create every persona/context combination stored in responses.json.

    The current rulebook contains 12 persona templates and 10 contexts,
    producing 120 usable personas.
    """
    templates = config.get("persona_templates", [])
    contexts = config.get("persona_contexts", [])
    personas: list[dict[str, Any]] = []
    for template in templates:
        for context in contexts:
            persona_id = f"{template['id']}-{context['id']}"
            personas.append(
                {
                    "id": persona_id,
                    "name": f"{template['name']} - {context['name']}",
                    "base_id": template["id"],
                    "context_id": context["id"],
                    "risk_tags": list(template.get("risk_tags", [])),
                    "advice": dict(template.get("advice", {})),
                }
            )
    return personas


def expand_activities(config: Mapping[str, Any]) -> list[dict[str, Any]]:
    """
    Flatten the activity groups in responses.json into one searchable catalog.

    The current rulebook contains 30 groups with 20 activities each: 600
    activities. Duplicate names are removed while keeping their first group.
    """
    activities: list[dict[str, Any]] = []
    seen_names: set[str] = set()
    for group in config.get("activity_groups", []):
        for activity_name in group.get("activities", []):
            normalized_name = str(activity_name).casefold()
            if normalized_name in seen_names:
                continue
            seen_names.add(normalized_name)
            activities.append(
                {
                    "id": f"{_slug(group['id'])}-{_slug(activity_name)}",
                    "name": activity_name,
                    "group_id": group["id"],
                    "category": group["category"],
                    "risk_tags": list(group.get("risk_tags", [])),
                }
            )
    return activities


def get_sample_input(
    sample_id: str = DEFAULT_SAMPLE_ID,
    config: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """Return one sample weather input from responses.json."""
    loaded_config = config if config is not None else load_response_config()
    for sample in loaded_config.get("sample_inputs", []):
        if sample.get("id") == sample_id:
            return dict(sample)
    raise KeyError(f"Sample input not found: {sample_id}")


def get_persona(
    persona_id: str = DEFAULT_PERSONA_ID,
    config: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """Return one of the generated persona/context combinations."""
    loaded_config = config if config is not None else load_response_config()
    for persona in expand_personas(loaded_config):
        if persona["id"] == persona_id:
            return persona
    raise KeyError(f"Persona not found: {persona_id}")


def get_activity(
    activity_id: str = DEFAULT_ACTIVITY_ID,
    config: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """Return one activity from the generated catalog."""
    loaded_config = config if config is not None else load_response_config()
    for activity in expand_activities(loaded_config):
        if activity["id"] == activity_id:
            return activity
    raise KeyError(f"Activity not found: {activity_id}")


def _condition_matches(
    weather: Mapping[str, Any],
    condition_rule: Mapping[str, Any],
) -> bool:
    when = condition_rule.get("when", {})
    field = when.get("field")
    value = weather.get(field)
    if value is None:
        return False

    if "contains" in when:
        return str(when["contains"]).casefold() in str(value).casefold()

    target = when.get("value")
    operator = when.get("operator")
    if target is None or operator is None:
        return False
    try:
        left = float(value)
        right = float(target)
    except (TypeError, ValueError):
        return False

    comparisons = {
        ">": left > right,
        ">=": left >= right,
        "<": left < right,
        "<=": left <= right,
        "==": left == right,
    }
    return comparisons.get(operator, False)


def _condition_applies_to_activity(
    condition_rule: Mapping[str, Any],
    activity: Mapping[str, Any],
) -> bool:
    allowed_tags = set(condition_rule.get("applies_to", []))
    if not allowed_tags:
        return True
    activity_tags = set(activity.get("risk_tags", []))
    return bool(allowed_tags.intersection(activity_tags))


def _advice_key(condition_id: str) -> str:
    if condition_id in {"extreme_heat", "heat_stress"}:
        return "heat"
    if condition_id in {"very_cold"}:
        return "cold"
    if condition_id in {"high_rain", "heavy_rain"}:
        return "rain"
    return "default"


def generate_response(
    weather: Mapping[str, Any],
    persona_id: str = DEFAULT_PERSONA_ID,
    activity_id: str = DEFAULT_ACTIVITY_ID,
    config: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """
    Return one complete response without reading input or writing output.

    All response messages and conditions are loaded from responses.json.
    """
    loaded_config = config if config is not None else load_response_config()
    persona = get_persona(persona_id, loaded_config)
    activity = get_activity(activity_id, loaded_config)

    matched_conditions: list[dict[str, Any]] = []
    for condition_rule in loaded_config.get("conditions", []):
        if _condition_matches(weather, condition_rule) and _condition_applies_to_activity(
            condition_rule, activity
        ):
            matched_conditions.append(
                {
                    "condition_id": condition_rule["id"],
                    "message": condition_rule["message"],
                    "action": condition_rule["action"],
                }
            )

    if matched_conditions:
        response_items = matched_conditions
    else:
        safe_response = loaded_config.get("safe_response", {})
        response_items = [
            {
                "condition_id": "safe",
                "message": safe_response.get(
                    "message", "The weather looks suitable for this plan."
                ),
                "action": safe_response.get(
                    "action", "Check local updates before leaving."
                ),
            }
        ]

    advice = persona.get("advice", {})
    persona_tips: list[str] = []
    for item in matched_conditions:
        key = _advice_key(item["condition_id"])
        tip = advice.get(key)
        if tip and tip not in persona_tips:
            persona_tips.append(tip)
    if not persona_tips and advice.get("default"):
        persona_tips.append(advice["default"])

    return {
        "response_version": "1.0",
        "sample_input_id": weather.get("id"),
        "weather": dict(weather),
        "persona": {
            "id": persona["id"],
            "name": persona["name"],
            "base_id": persona["base_id"],
            "context_id": persona["context_id"],
        },
        "activity": {
            "id": activity["id"],
            "name": activity["name"],
            "group_id": activity["group_id"],
            "category": activity["category"],
        },
        "matched_condition_ids": [
            item["condition_id"] for item in matched_conditions
        ],
        "responses": response_items,
        "persona_tips": persona_tips,
    }


def generate_sample_response(
    sample_id: str = DEFAULT_SAMPLE_ID,
    persona_id: str = DEFAULT_PERSONA_ID,
    activity_id: str = DEFAULT_ACTIVITY_ID,
    config: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """Generate a response using only sample data from responses.json."""
    weather = get_sample_input(sample_id, config)
    return generate_response(weather, persona_id, activity_id, config)


def export_sample_response(
    sample_id: str = DEFAULT_SAMPLE_ID,
    persona_id: str = DEFAULT_PERSONA_ID,
    activity_id: str = DEFAULT_ACTIVITY_ID,
    transcript_path: str | Path | None = None,
    config: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """
    Generate one sample response, export it to transcript.json, and return it.

    Pass transcript_path when the calling application wants a different file.
    """
    response = generate_sample_response(sample_id, persona_id, activity_id, config)
    return export_response(response, transcript_path)