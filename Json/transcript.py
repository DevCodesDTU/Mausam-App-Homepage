"""Silent transcript export helpers for the Mausam response engine."""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterable, Mapping


def _utc_timestamp() -> str:
    return datetime.now(timezone.utc).isoformat()


def create_transcript_record(response: Mapping[str, Any]) -> dict[str, Any]:
    """Wrap one generated response as a transcript record."""
    return {
        "recorded_at": _utc_timestamp(),
        "response": dict(response),
    }


def export_transcript(
    responses: Mapping[str, Any] | Iterable[Mapping[str, Any]],
    file_path: str | Path | None = None,
) -> dict[str, Any]:
    """
    Write responses to a JSON transcript and return the same exported object.

    This function is the only function that writes a file. It does not print
    anything, ask for input, or start a command-line interface.
    """
    if isinstance(responses, Mapping):
        response_list = [responses]
    else:
        response_list = list(responses)

    transcript = {
        "transcript_version": "1.0",
        "exported_at": _utc_timestamp(),
        "records": [create_transcript_record(response) for response in response_list],
    }
    destination = (
        Path(file_path)
        if file_path is not None
        else Path(__file__).with_name("transcript.json")
    )
    destination.write_text(
        json.dumps(transcript, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    return transcript


def export_response(
    response: Mapping[str, Any],
    file_path: str | Path | None = None,
) -> dict[str, Any]:
    """Export one response and return the complete transcript object."""
    return export_transcript(response, file_path)