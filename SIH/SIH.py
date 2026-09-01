

import json


def get_weather_json():
    """
    Returns weather data as a JSON STRING, organized as:
        { location: { time_of_day: { weather fields... } } }
    This lets location + time-of-day selection actually change the data used.
    """
    sample_weather_json_string = """
    {
        "Delhi": {
            "morning":   {"temperature": 24, "humidity": 55, "rain_probability": 10, "wind_speed": 12, "uv_index": 4, "weather_condition": "Clear Sky", "alerts": []},
            "afternoon": {"temperature": 38, "humidity": 30, "rain_probability": 5,  "wind_speed": 15, "uv_index": 9, "weather_condition": "Sunny", "alerts": ["Heatwave Warning"]},
            "evening":   {"temperature": 31, "humidity": 45, "rain_probability": 20, "wind_speed": 18, "uv_index": 3, "weather_condition": "Partly Cloudy", "alerts": []},
            "night":     {"temperature": 26, "humidity": 50, "rain_probability": 15, "wind_speed": 10, "uv_index": 0, "weather_condition": "Clear", "alerts": []}
        },
        "Mumbai": {
            "morning":   {"temperature": 27, "humidity": 80, "rain_probability": 60, "wind_speed": 20, "uv_index": 5, "weather_condition": "Cloudy", "alerts": []},
            "afternoon": {"temperature": 30, "humidity": 75, "rain_probability": 70, "wind_speed": 25, "uv_index": 6, "weather_condition": "Rain Showers", "alerts": []},
            "evening":   {"temperature": 28, "humidity": 85, "rain_probability": 90, "wind_speed": 45, "uv_index": 1, "weather_condition": "Severe Thunderstorm", "alerts": ["Tornado Warning"]},
            "night":     {"temperature": 26, "humidity": 80, "rain_probability": 50, "wind_speed": 20, "uv_index": 0, "weather_condition": "Light Rain", "alerts": []}
        },
        "Chennai": {
            "morning":   {"temperature": 29, "humidity": 70, "rain_probability": 20, "wind_speed": 15, "uv_index": 6, "weather_condition": "Sunny", "alerts": []},
            "afternoon": {"temperature": 34, "humidity": 65, "rain_probability": 10, "wind_speed": 20, "uv_index": 10, "weather_condition": "Clear Sky", "alerts": []},
            "evening":   {"temperature": 30, "humidity": 75, "rain_probability": 40, "wind_speed": 55, "uv_index": 2, "weather_condition": "Cyclonic Storm", "alerts": ["Cyclone Alert"]},
            "night":     {"temperature": 27, "humidity": 78, "rain_probability": 30, "wind_speed": 30, "uv_index": 0, "weather_condition": "Windy", "alerts": []}
        }
    }
    """
    return sample_weather_json_string

def parse_weather_json(json_string):
    """Converts the JSON string into a Python dictionary using json.loads()."""
    try:
        return json.loads(json_string)
    except json.JSONDecodeError as error:
        print(f"Error: Invalid JSON received. Details: {error}")
        return None


def get_location(weather_data):
    """Asks the user to pick one of the available locations in the JSON."""
    available_locations = list(weather_data.keys())
    print("\nAvailable locations:")
    for loc in available_locations:
        print(f"  - {loc}")

    while True:
        user_input = input("\nEnter your location from the list above: ").strip()
        for loc in available_locations:
            if loc.lower() == user_input.lower():
                return loc
        print("Location not found in sample data. Please type one of the listed locations exactly.")


def get_time_of_day():
    """Asks the user to pick a time-of-day slot."""
    valid_slots = ["morning", "afternoon", "evening", "night"]
    print("\nAvailable time-of-day slots:", ", ".join(valid_slots))

    while True:
        user_input = input("Enter the time of day you are planning for: ").strip().lower()
        if user_input in valid_slots:
            return user_input
        print("Invalid time slot. Please enter one of: morning, afternoon, evening, night.")


def extract_weather_fields(weather_slot):
    """Extracts fields safely from the chosen location/time weather slot."""
    return {
        "temperature": weather_slot.get("temperature"),
        "humidity": weather_slot.get("humidity"),
        "rain_probability": weather_slot.get("rain_probability"),
        "wind_speed": weather_slot.get("wind_speed"),
        "uv_index": weather_slot.get("uv_index"),
        "weather_condition": weather_slot.get("weather_condition", "Not available"),
        "alerts": weather_slot.get("alerts", []),
    }

PERSONA_FIELD_MAP = {
    "traveler": ["temperature", "rain_probability", "wind_speed", "alerts"],
    "farmer": ["temperature", "humidity", "rain_probability", "alerts"],
    "fitness enthusiast": ["temperature", "uv_index", "wind_speed", "weather_condition"],
    "commuter": ["temperature", "rain_probability", "weather_condition", "alerts"],
    "general user": ["temperature", "humidity", "weather_condition", "alerts"],
}

FIELD_LABELS = {
    "temperature": "Temperature (deg C)",
    "humidity": "Humidity (%)",
    "rain_probability": "Rain Probability (%)",
    "wind_speed": "Wind Speed (km/h)",
    "uv_index": "UV Index",
    "weather_condition": "Weather Condition",
    "alerts": "Weather Alerts",
}


def get_user_persona():
    print("\nAvailable personas:")
    for persona_name in PERSONA_FIELD_MAP:
        print(f"  - {persona_name.title()}")

    while True:
        user_choice = input("\nEnter your persona from the list above: ").strip().lower()
        if user_choice in PERSONA_FIELD_MAP:
            return user_choice
        print("Invalid persona entered. Please type one of the listed personas exactly.")


def personalize_weather_data(extracted_data, persona, location):
    relevant_fields = PERSONA_FIELD_MAP[persona]
    personalized_data = {"location": location}
    for field in relevant_fields:
        personalized_data[field] = extracted_data[field]
    return personalized_data

ACTIVITY_KEYWORDS = {
    "outdoor_physical": ["hik", "trek", "run", "jog", "cycling", "climb", "marathon","hiking"
                          "sport", "football", "cricket", "tennis", "swim", "walk"],
    "farming": ["farm", "crop", "harvest", "sow", "irrigat", "agricultur", "plant"],
    "commute": ["commut", "drive", "driving", "travel", "flight", "road trip", "bus", "train"],
    "outdoor_general": ["picnic", "camp", "wedding", "event", "festival", "market",
                         "garden", "photography", "fishing", "boat", "sail", "outdoor"],
}


def get_user_activity():
    return input("\nWhat activity are you planning to do? ").strip()


def classify_activity(activity_text):

    activity_lower = activity_text.lower()
    for category, keywords in ACTIVITY_KEYWORDS.items():
        for keyword in keywords:
            if keyword in activity_lower:
                return category
    return "general"

def generate_recommendation(weather, category, activity_text):
    """
    Produces plain-language advice by checking, in order:
      1) Active weather alerts (highest priority - e.g. Tornado Warning)
      2) Rain probability
      3) Wind speed
      4) UV index
      5) Temperature (heat / cold)
    Each check only adds a message if it is relevant to the activity category.
    """
    messages = []
    alerts = weather["alerts"]

    if alerts:
        for alert in alerts:
            if category in ("outdoor_physical", "outdoor_general", "farming"):
                messages.append(
                    f"\u26a0 {alert} is active - it is strongly recommended to AVOID or "
                    f"POSTPONE '{activity_text}' until conditions improve."
                )
            elif category == "commute":
                messages.append(
                    f"\u26a0 {alert} is active - travel with extra caution and check "
                    f"road/flight status before heading out for '{activity_text}'."
                )
            else:
                messages.append(
                    f"\u26a0 {alert} is active in this area - stay indoors where possible "
                    f"and monitor official updates."
                )

    if weather["rain_probability"] is not None and weather["rain_probability"] >= 60 \
            and category in ("outdoor_physical", "outdoor_general", "farming", "commute"):
        messages.append(
            f"High rain probability ({weather['rain_probability']}%) - carry rain "
            f"protection or consider rescheduling '{activity_text}'."
        )

    if weather["wind_speed"] is not None and weather["wind_speed"] >= 40 and category != "general":
        messages.append(
            f"Strong winds ({weather['wind_speed']} km/h) expected - exercise caution, "
            f"especially since '{activity_text}' may involve time outdoors."
        )

    if weather["uv_index"] is not None and weather["uv_index"] >= 8 \
            and category in ("outdoor_physical", "outdoor_general", "farming"):
        messages.append(
            f"Very high UV index ({weather['uv_index']}) - use sunscreen, wear a hat, "
            f"and stay hydrated during '{activity_text}'."
        )

    if weather["temperature"] is not None and weather["temperature"] >= 38 \
            and category in ("outdoor_physical", "farming"):
        messages.append(
            f"High temperature ({weather['temperature']} deg C) - risk of heat "
            f"exhaustion during '{activity_text}'; avoid peak afternoon hours and stay hydrated."
        )

    if weather["temperature"] is not None and weather["temperature"] <= 5 and category != "general":
        messages.append(
            f"Low temperature ({weather['temperature']} deg C) - dress warmly before "
            f"heading out for '{activity_text}'."
        )

    if not messages:
        messages.append(
            f"Conditions look reasonable for '{activity_text}' at this time - "
            f"no major weather concerns detected."
        )

    return messages


def display_output(personalized_data, persona, activity_text, recommendation_messages):
    print("\n" + "=" * 55)
    print(f"  PERSONALIZED WEATHER - {persona.title()} @ {personalized_data['location']}")
    print("=" * 55)
    for field, value in personalized_data.items():
        if field == "location":
            continue
        label = FIELD_LABELS.get(field, field)
        if field == "alerts":
            value_display = ", ".join(value) if value else "No active alerts"
        else:
            value_display = value
        print(f"  {label:<25}: {value_display}")
    print("=" * 55)

    print(f"\nActivity planned: {activity_text}")
    print("Recommendation:")
    for message in recommendation_messages:
        print(f"  - {message}")

def convert_to_json_output(personalized_data, activity_text, activity_category, recommendation_messages):
    output_data = dict(personalized_data)
    output_data["activity"] = activity_text
    output_data["activity_category"] = activity_category
    output_data["recommendations"] = recommendation_messages
    return json.dumps(output_data, indent=4)


def main():
    print("SIH26076 - Mausam Personalized Homepage - JSON Personalization + Activity Advisory Module")
    print("(Using SAMPLE weather data for demonstration - not real IMD data)")

    raw_json_string = get_weather_json()
    weather_data = parse_weather_json(raw_json_string)
    if weather_data is None:
        print("Could not proceed because the weather JSON was invalid.")
        return

    location = get_location(weather_data)
    time_of_day = get_time_of_day()
    weather_slot = weather_data[location][time_of_day]
    extracted_data = extract_weather_fields(weather_slot)

    persona = get_user_persona()
    personalized_data = personalize_weather_data(extracted_data, persona, location)

    activity_text = get_user_activity()
    activity_category = classify_activity(activity_text)
    recommendation_messages = generate_recommendation(extracted_data, activity_category, activity_text)

    display_output(personalized_data, persona, activity_text, recommendation_messages)

    json_output = convert_to_json_output(
        personalized_data, activity_text, activity_category, recommendation_messages
    )
    print("\nFinal personalized data:")
    print(json_output)


if __name__ == "__main__":
    main()