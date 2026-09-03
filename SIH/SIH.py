
import json
import re

from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen



from datetime import date, datetime, timedelta, timezone
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
try:
    INDIA_TIMEZONE = ZoneInfo("Asia/Kolkata")
except ZoneInfoNotFoundError:
    INDIA_TIMEZONE = timezone(timedelta(hours=5, minutes=30), name="IST")


OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"
REQUEST_TIMEOUT_SECONDS = 15


STATES_AND_UTS = [
    ("Andhra Pradesh", "Amaravati"),
    ("Arunachal Pradesh", "Itanagar"),
    ("Assam", "Guwahati"),
    ("Bihar", "Patna"),
    ("Chhattisgarh", "Raipur"),
    ("Goa", "Panaji"),
    ("Gujarat", "Gandhinagar"),
    ("Haryana", "Chandigarh"),
    ("Himachal Pradesh", "Shimla"),
    ("Jharkhand", "Ranchi"),
    ("Karnataka", "Bengaluru"),
    ("Kerala", "Thiruvananthapuram"),
    ("Madhya Pradesh", "Bhopal"),
    ("Maharashtra", "Mumbai"),
    ("Manipur", "Imphal"),
    ("Meghalaya", "Shillong"),
    ("Mizoram", "Aizawl"),
    ("Nagaland", "Kohima"),
    ("Odisha", "Bhubaneswar"),
    ("Punjab", "Chandigarh"),
    ("Rajasthan", "Jaipur"),
    ("Sikkim", "Gangtok"),
    ("Tamil Nadu", "Chennai"),
    ("Telangana", "Hyderabad"),
    ("Tripura", "Agartala"),
    ("Uttar Pradesh", "Lucknow"),
    ("Uttarakhand", "Dehradun"),
    ("West Bengal", "Kolkata"),
    ("Andaman and Nicobar Islands", "Port Blair"),
    ("Chandigarh (UT)", "Chandigarh"),
    ("Dadra and Nagar Haveli and Daman and Diu", "Daman"),
    ("Delhi (NCT)", "New Delhi"),
    ("Jammu and Kashmir", "Srinagar"),
    ("Ladakh", "Leh"),
    ("Lakshadweep", "Kavaratti"),
    ("Puducherry", "Puducherry"),
]


CITY_COORDINATES = {
    "Amaravati": (16.5131, 80.5165),
    "Itanagar": (27.0844, 93.6053),
    "Guwahati": (26.1445, 91.7362),
    "Patna": (25.5941, 85.1376),
    "Raipur": (21.2514, 81.6296),
    "Panaji": (15.4909, 73.8278),
    "Gandhinagar": (23.2156, 72.6369),
    "Chandigarh": (30.7333, 76.7794),
    "Shimla": (31.1048, 77.1734),
    "Ranchi": (23.3441, 85.3096),
    "Bengaluru": (12.9716, 77.5946),
    "Thiruvananthapuram": (8.5241, 76.9366),
    "Bhopal": (23.2599, 77.4126),
    "Mumbai": (19.0760, 72.8777),
    "Imphal": (24.8170, 93.9368),
    "Shillong": (25.5788, 91.8933),
    "Aizawl": (23.7271, 92.7176),
    "Kohima": (25.6751, 94.1086),
    "Bhubaneswar": (20.2961, 85.8245),
    "Jaipur": (26.9124, 75.7873),
    "Gangtok": (27.3389, 88.6065),
    "Chennai": (13.0827, 80.2707),
    "Hyderabad": (17.3850, 78.4867),
    "Agartala": (23.8315, 91.2868),
    "Lucknow": (26.8467, 80.9462),
    "Dehradun": (30.3165, 78.0322),
    "Kolkata": (22.5726, 88.3639),
    "Port Blair": (11.6234, 92.7265),
    "Daman": (20.3974, 72.8328),
    "New Delhi": (28.6139, 77.2090),
    "Srinagar": (34.0837, 74.7973),
    "Leh": (34.1526, 77.5771),
    "Kavaratti": (10.5669, 72.6420),
    "Puducherry": (11.9416, 79.8083),
}


TIME_SLOTS = [
    "overnight",
    "early morning",
    "morning",
    "late morning",
    "afternoon",
    "late afternoon",
    "evening",
    "late evening",
]
TIME_SLOT_HOURS = {
    "overnight": 2,
    "early morning": 5,
    "morning": 8,
    "late morning": 11,
    "afternoon": 14,
    "late afternoon": 17,
    "evening": 19,
    "late evening": 22,
}
TIME_ALIASES = {
    "night": "overnight",
    "midnight": "overnight",
    "dawn": "early morning",
    "noon": "afternoon",
    "midday": "afternoon",
    "sunset": "evening",
}


WEATHER_CODE_LABELS = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
}


PERSONA_FIELD_MAP = {
    "traveler": [
        "temperature", "rain_probability", "wind_speed", "weather_condition", "alerts"
    ],
    "farmer": [
        "temperature", "humidity", "rain_probability", "precipitation",
        "wind_speed", "alerts",
    ],
    "fitness enthusiast": [
        "temperature", "feels_like", "uv_index", "wind_speed",
        "rain_probability", "weather_condition",
    ],
    "commuter": [
        "temperature", "rain_probability", "wind_speed", "weather_condition", "alerts"
    ],
    "general user": [
        "temperature", "feels_like", "humidity", "weather_condition", "alerts"
    ],
    "student": [
        "temperature", "rain_probability", "wind_speed", "weather_condition", "alerts"
    ],
    "senior citizen": [
        "temperature", "feels_like", "humidity", "wind_speed", "alerts"
    ],
    "parent": [
        "temperature", "uv_index", "rain_probability", "weather_condition", "alerts"
    ],
    "outdoor worker": [
        "temperature", "feels_like", "humidity", "uv_index",
        "wind_speed", "rain_probability", "alerts",
    ],
    "cyclist": [
        "temperature", "wind_speed", "rain_probability", "weather_condition", "alerts"
    ],
    "photographer": [
        "weather_condition", "cloud_cover", "rain_probability", "wind_speed", "alerts"
    ],
    "event planner": [
        "temperature", "rain_probability", "wind_speed", "weather_condition", "alerts"
    ],
    "pet owner": [
        "temperature", "feels_like", "humidity", "uv_index", "weather_condition", "alerts"
    ],
}

PERSONA_DESCRIPTIONS = {
    "traveler": "journeys, road trips, and sightseeing",
    "farmer": "field work, irrigation, and crop planning",
    "fitness enthusiast": "running, walking, and outdoor exercise",
    "commuter": "daily travel by road, rail, or air",
    "general user": "everyday plans",
    "student": "school, college, and campus travel",
    "senior citizen": "comfortable and lower-risk outings",
    "parent": "planning safe activities for children",
    "outdoor worker": "construction, delivery, and outdoor shifts",
    "cyclist": "cycling and two-wheeler travel",
    "photographer": "light, clouds, and outdoor shoots",
    "event planner": "organizing outdoor gatherings",
    "pet owner": "walks and time outside with pets",
}
PERSONA_ALIASES = {
    "athlete": "fitness enthusiast",
    "fitness": "fitness enthusiast",
    "elderly": "senior citizen",
    "senior": "senior citizen",
    "child": "parent",
    "children": "parent",
    "outdoor worker": "outdoor worker",
    "worker": "outdoor worker",
    "pet": "pet owner",
}


FIELD_LABELS = {
    "temperature": "Temperature (deg C)",
    "feels_like": "Feels Like (deg C)",
    "humidity": "Humidity (%)",
    "rain_probability": "Rain Probability (%)",
    "precipitation": "Precipitation (mm)",
    "wind_speed": "Wind Speed (km/h)",
    "uv_index": "UV Index",
    "cloud_cover": "Cloud Cover (%)",
    "weather_condition": "Weather Condition",
    "alerts": "Weather Advisory Flags",
}


ACTIVITY_KEYWORDS = {
    # Keep farming first so farm-related words are always classified correctly.
    "farming": [
        "farm", "farmer", "farming", "agriculture", "agricultural",
        "cultivation", "cultivate", "field work", "fieldwork", "crop",
        "crops", "harvest", "harvesting", "sow", "sowing", "seeding",
        "seed planting", "planting", "weeding", "plough", "ploughing",
        "plow", "plowing", "tilling", "irrigat", "watering crops",
        "fertilizer", "fertiliser", "pesticide", "spraying", "orchard",
        "dairy", "livestock", "cattle", "poultry", "goat farming",
        "fish farming", "greenhouse", "nursery",
    ],
    "outdoor_physical": [
        "hik", "trek", "run", "jog", "cycl", "climb", "marathon",
        "sport", "football", "cricket", "tennis", "badminton", "hockey",
        "basketball", "volleyball", "golf", "swim", "walking", "walk",
        "jogging", "running", "gym", "workout", "exercise", "yoga",
        "exercise class", "race", "match", "play outside",
    ],
    "commute": [
        "commut", "drive", "driving", "travel", "flight", "road trip",
        "bus", "train", "metro", "auto", "rickshaw", "taxi", "cab",
        "bike ride", "motorcycle", "scooter", "car", "ride to work",
        "ride to school", "go to office",
    ],
    "outdoor_general": [
        "picnic", "camp", "wedding", "event", "festival", "market",
        "garden", "gardening", "fishing", "boat", "sail", "outdoor",
        "park", "beach", "hike", "sightseeing", "tour", "outing",
        "concert", "fair", "parade", "street food", "visit a park",
    ],
    "school": [
        "school", "college", "campus", "class", "exam", "tuition",
        "lecture", "study", "library", "school trip", "sports day",
        "school bus", "college fest",
    ],
    "pet_care": [
        "pet", "dog", "puppy", "cat", "kitten", "walk the dog", "dog walk",
        "animal", "veterinary", "vet", "pet grooming", "feed the animals",
    ],
    "water_activity": [
        "swim", "swimming", "beach", "surf", "boat", "sail", "kayak",
        "rafting", "fishing trip", "water park", "pool", "diving",
    ],
    "delivery_or_shift": [
        "delivery", "construction", "security", "shift", "street vendor",
        "warehouse", "factory", "traffic duty", "road work", "building work",
        "plumbing", "electrician", "painting a house", "outdoor job",
    ],
    "photography": [
        "photo", "photograph", "photography", "shoot", "camera", "portrait",
        "wedding shoot", "video shoot", "film shoot", "sunset photos",
    ],
    "shopping": [
        "shopping", "buy groceries", "grocery", "mall", "supermarket",
        "shop", "buy clothes", "shopping trip", "street market",
    ],
    "religious_visit": [
        "temple", "mosque", "church", "gurudwara", "gurdwara", "prayer",
        "pooja", "puja", "worship", "pilgrimage", "religious visit",
    ],
    "healthcare": [
        "doctor", "hospital", "clinic", "medical", "checkup", "check-up",
        "appointment", "therapy", "vaccination", "blood test",
    ],
    "home_work": [
        "house cleaning", "cleaning", "washing clothes", "laundry",
        "cook", "cooking", "repair", "home repair", "moving house",
        "paint the house", "roof repair",
    ],
    "social_visit": [
        "visit family", "visit friends", "birthday", "party", "function",
        "meeting", "reunion", "dinner", "lunch", "date",
    ],
}
ACTIVITY_PRIORITY = [
    "farming",
    "water_activity",
    "pet_care",
    "photography",
    "school",
    "delivery_or_shift",
    "healthcare",
    "religious_visit",
    "shopping",
    "home_work",
    "social_visit",
    "commute",
    "outdoor_physical",
    "outdoor_general",
]



class WeatherServiceError(RuntimeError):
    """Raised when live weather cannot be retrieved or understood."""


def current_india_datetime():
    """Return the current date/time in the forecast's timezone."""
    return datetime.now(INDIA_TIMEZONE)


def get_location():
    """Ask the user to choose one of the available Indian states/UTs."""
    print(f"\nAvailable states/UTs ({len(STATES_AND_UTS)} total):")
    for index, (state_name, city_name) in enumerate(STATES_AND_UTS, start=1):
        print(f"  {index:>2}. {state_name} ({city_name})")

    while True:
        user_input = input(
            "\nEnter a state/UT name, capital city, or list number: "
        ).strip()
        if user_input.isdigit():
            index = int(user_input) - 1
            if 0 <= index < len(STATES_AND_UTS):
                return STATES_AND_UTS[index]

        for state_name, city_name in STATES_AND_UTS:
            if user_input.casefold() in {state_name.casefold(), city_name.casefold()}:
                return state_name, city_name
        print("Location not found. Enter a name from the list or its number.")


def get_forecast_date():
    """Ask for today, tomorrow, the day after tomorrow, or a valid date."""
    today = current_india_datetime().date()
    options = {
        "1": today,
        "2": today + timedelta(days=1),
        "3": today + timedelta(days=2),
    }
    print("\nForecast date:")
    print(f"  1. Today ({today.isoformat()})")
    print(f"  2. Tomorrow ({options['2'].isoformat()})")
    print(f"  3. Day after tomorrow ({options['3'].isoformat()})")
    print("  Or type a date as YYYY-MM-DD (up to 7 days ahead).")

    while True:
        user_input = input("Choose a forecast date: ").strip()
        if user_input in options:
            return options[user_input]
        try:
            selected_date = date.fromisoformat(user_input)
        except ValueError:
            selected_date = None
        if selected_date is not None and 0 <= (selected_date - today).days <= 6:
            return selected_date
        print("Please choose 1, 2, 3, or a date from today through the next 6 days.")


def get_time_of_day():
    print("\nAvailable planning times:")
    for slot in TIME_SLOTS:
        print(f"  - {slot.title()} ({TIME_SLOT_HOURS[slot]:02d}:00)")
    print("  - You can also enter an exact time such as 16:30.")

    while True:
        user_input = input("Enter the time you are planning for: ").strip().lower()
        normalized = TIME_ALIASES.get(user_input, user_input)
        if normalized in TIME_SLOT_HOURS:
            return normalized, TIME_SLOT_HOURS[normalized]

        match = re.fullmatch(r"([01]\d|2[0-3]):([0-5]\d)", user_input)
        if match:
            hour = int(match.group(1))
            minute = int(match.group(2))
            return f"exactly {hour:02d}:{minute:02d}", hour + minute / 60

        print("Invalid time. Choose a listed window or enter HH:MM.")


def weather_condition_from_code(weather_code):
    return WEATHER_CODE_LABELS.get(int(weather_code), "Unknown conditions")


def create_advisory_flags(weather):
    """
    Create transparent, threshold-based flags from live forecast values.

    These are not official government warnings. Official warnings should be
    checked with the India Meteorological Department before high-risk plans.
    """
    flags = []
    rain_probability = weather.get("rain_probability")
    wind_speed = weather.get("wind_speed")
    temperature = weather.get("temperature")
    uv_index = weather.get("uv_index")
    condition = (weather.get("weather_condition") or "").lower()

    if "thunderstorm" in condition or "hail" in condition:
        flags.append("Thunderstorm risk")
    if rain_probability is not None and rain_probability >= 70:
        flags.append("High rain probability")
    if wind_speed is not None and wind_speed >= 40:
        flags.append("Strong wind")
    if temperature is not None and temperature >= 40:
        flags.append("Extreme heat")
    elif temperature is not None and temperature >= 36:
        flags.append("Heat stress possible")
    if temperature is not None and temperature <= 5:
        flags.append("Very cold conditions")
    if uv_index is not None and uv_index >= 8:
        flags.append("Very high UV")
    if "fog" in condition:
        flags.append("Reduced visibility")
    return flags


def _get_hourly_value(hourly_data, key, index):
    values = hourly_data.get(key, [])
    if index >= len(values):
        return None
    return values[index]


def fetch_live_weather(state_name, city_name, forecast_date, target_hour):
    """Fetch and normalize one hourly forecast from Open-Meteo."""
    if city_name not in CITY_COORDINATES:
        raise WeatherServiceError(f"No coordinates are configured for {city_name}.")

    latitude, longitude = CITY_COORDINATES[city_name]
    query = urlencode(
        {
            "latitude": latitude,
            "longitude": longitude,
            "hourly": (
                "temperature_2m,apparent_temperature,relative_humidity_2m,"
                "precipitation_probability,precipitation,wind_speed_10m,"
                "uv_index,cloud_cover,weather_code"
            ),
            "forecast_days": 7,
            "timezone": "Asia/Kolkata",
        }
    )
    request = Request(
        f"{OPEN_METEO_URL}?{query}",
        headers={"User-Agent": "Mausam-Personalized-Weather/1.0"},
    )

    try:
        with urlopen(request, timeout=REQUEST_TIMEOUT_SECONDS) as response:
            payload = json.loads(response.read().decode("utf-8"))
    except HTTPError as error:
        raise WeatherServiceError(
            f"The weather service returned HTTP {error.code}."
        ) from error
    except (URLError, TimeoutError) as error:
        raise WeatherServiceError(
            "The live weather service could not be reached. Check your internet connection."
        ) from error
    except json.JSONDecodeError as error:
        raise WeatherServiceError("The weather service returned invalid JSON.") from error

    hourly = payload.get("hourly")
    times = hourly.get("time", []) if isinstance(hourly, dict) else []
    if not times:
        raise WeatherServiceError("The weather service returned no hourly forecast.")

    requested_minutes = target_hour * 60
    candidates = []
    for index, timestamp in enumerate(times):
        try:
            timestamp_date, timestamp_time = timestamp.split("T")
            hour, minute = map(int, timestamp_time.split(":")[:2])
        except (ValueError, AttributeError):
            continue
        if timestamp_date == forecast_date.isoformat():
            difference = abs((hour * 60 + minute) - requested_minutes)
            candidates.append((difference, index, timestamp))

    if not candidates:
        raise WeatherServiceError(
            f"No forecast was returned for {forecast_date.isoformat()}."
        )

    _, index, forecast_timestamp = min(candidates, key=lambda item: item[0])
    weather_code = _get_hourly_value(hourly, "weather_code", index)
    normalized = {
        "temperature": _get_hourly_value(hourly, "temperature_2m", index),
        "feels_like": _get_hourly_value(hourly, "apparent_temperature", index),
        "humidity": _get_hourly_value(hourly, "relative_humidity_2m", index),
        "rain_probability": _get_hourly_value(
            hourly, "precipitation_probability", index
        ),
        "precipitation": _get_hourly_value(hourly, "precipitation", index),
        "wind_speed": _get_hourly_value(hourly, "wind_speed_10m", index),
        "uv_index": _get_hourly_value(hourly, "uv_index", index),
        "cloud_cover": _get_hourly_value(hourly, "cloud_cover", index),
        "weather_condition": weather_condition_from_code(weather_code),
        "alerts": [],
        "forecast_time": forecast_timestamp,
        "data_source": "Open-Meteo live forecast",
        "advisory_note": (
            "Flags are calculated from forecast thresholds, not official warnings. "
            "Check IMD alerts for emergency decisions."
        ),
    }
    normalized["alerts"] = create_advisory_flags(normalized)
    normalized["state"] = state_name
    normalized["city"] = city_name
    normalized["coordinates"] = {
        "latitude": latitude,
        "longitude": longitude,
    }
    return normalized


def get_weather_json(state_name, city_name, forecast_date, target_hour):
    """
    Return live data as a JSON string, preserving the original JSON parsing step.
    """
    weather_data = fetch_live_weather(
        state_name, city_name, forecast_date, target_hour
    )
    return json.dumps(weather_data)


def parse_weather_json(json_string):
    """Convert the JSON string into a Python dictionary using json.loads()."""
    try:
        return json.loads(json_string)
    except json.JSONDecodeError as error:
        print(f"Error: Invalid JSON received. Details: {error}")
        return None


def extract_weather_fields(weather_slot):
    return {
        "temperature": weather_slot.get("temperature"),
        "feels_like": weather_slot.get("feels_like"),
        "humidity": weather_slot.get("humidity"),
        "rain_probability": weather_slot.get("rain_probability"),
        "precipitation": weather_slot.get("precipitation"),
        "wind_speed": weather_slot.get("wind_speed"),
        "uv_index": weather_slot.get("uv_index"),
        "cloud_cover": weather_slot.get("cloud_cover"),
        "weather_condition": weather_slot.get(
            "weather_condition", "Not available"
        ),
        "alerts": weather_slot.get("alerts", []),
    }


def get_user_persona():
    print("\nAvailable personas:")
    for persona_name, description in PERSONA_DESCRIPTIONS.items():
        print(f"  - {persona_name.title()}: {description}")

    while True:
        user_choice = input(
            "\nEnter your persona from the list above: "
        ).strip().lower()
        normalized = PERSONA_ALIASES.get(user_choice, user_choice)
        if normalized in PERSONA_FIELD_MAP:
            return normalized
        print("Persona not found. Please choose one from the list.")


def personalize_weather_data(extracted_data, persona, state_name, city_name):
    relevant_fields = PERSONA_FIELD_MAP[persona]
    personalized_data = {"state": state_name, "city": city_name}
    for field in relevant_fields:
        personalized_data[field] = extracted_data.get(field)
    return personalized_data


def get_user_activity():
    return input("\nWhat activity are you planning to do? ").strip()

def classify_activity(activity_text):
    # Normalize punctuation so inputs such as "farm-work", "Farm work",
    # and "I am farming today" can all be recognized.
    activity_lower = re.sub(r"[^a-z0-9]+", " ", activity_text.lower()).strip()
    for category in ACTIVITY_PRIORITY:
        keywords = ACTIVITY_KEYWORDS[category]
        if any(keyword in activity_lower for keyword in keywords):
            return category
    return "general"


def generate_recommendation(weather, category, activity_text, persona):
    """Generate practical advice from the live forecast and selected persona."""
    messages = []
    alerts = weather.get("alerts", [])
    rain_probability = weather.get("rain_probability")
    wind_speed = weather.get("wind_speed")
    uv_index = weather.get("uv_index")
    temperature = weather.get("temperature")
    feels_like = weather.get("feels_like")
    humidity = weather.get("humidity")
    condition = weather.get("weather_condition", "current conditions")
    outdoor_categories = {
        "outdoor_physical", "outdoor_general", "farming", "commute",
        "school", "pet_care", "water_activity", "delivery_or_shift",
        "photography",
    }

    if alerts:
        if category in outdoor_categories:
            messages.append(
                f"Advisory flags ({', '.join(alerts)}) are active. "
                f"Consider postponing or moving '{activity_text}' indoors."
            )
        else:
            messages.append(
                f"Advisory flags ({', '.join(alerts)}) are active. "
                "Monitor official local updates."
            )

    if rain_probability is not None and rain_probability >= 60:
        if category in {"commute", "school", "delivery_or_shift"}:
            messages.append(
                f"Rain probability is {rain_probability}%; leave extra travel time "
                "and carry rain protection."
            )
        elif category in outdoor_categories:
            messages.append(
                f"Rain probability is {rain_probability}%; carry rain protection "
                f"or reschedule '{activity_text}'."
            )

    if wind_speed is not None and wind_speed >= 35 and category != "general":
        messages.append(
            f"Wind may reach {wind_speed} km/h. Secure loose items and use extra "
            f"caution during '{activity_text}'."
        )

    if uv_index is not None and uv_index >= 6 and category in outdoor_categories:
        messages.append(
            f"UV index is {uv_index}; use sunscreen, cover exposed skin, and "
            f"stay hydrated during '{activity_text}'."
        )

    if temperature is not None and temperature >= 36:
        messages.append(
            f"Temperature is {temperature} deg C"
            + (f" with a feels-like value of {feels_like} deg C" if feels_like else "")
            + "; avoid the hottest part of the day and take regular water breaks."
        )
    elif temperature is not None and temperature <= 8 and category != "general":
        messages.append(
            f"Temperature is {temperature} deg C; wear warm layers before "
            f"starting '{activity_text}'."
        )

    if humidity is not None and humidity >= 80 and category in {
        "outdoor_physical", "delivery_or_shift", "farming", "pet_care"
    }:
        messages.append(
            f"Humidity is {humidity}%; the air may feel uncomfortable, so take "
            "more frequent rest and hydration breaks."
        )

    if category == "pet_care" and temperature is not None and temperature >= 32:
        messages.append(
            "For a pet outing, prefer a shaded route and check the pavement "
            "before walking."
        )
    if category == "water_activity" and (
        (wind_speed is not None and wind_speed >= 30)
        or "thunderstorm" in condition.lower()
    ):
        messages.append(
            "Avoid open-water activity in strong wind or thunderstorm conditions "
            "and follow local lifeguard guidance."
        )
    if persona == "senior citizen" and (
        (temperature is not None and temperature >= 35)
        or (temperature is not None and temperature <= 8)
    ):
        messages.append(
            "Because you selected Senior Citizen, choose a shorter outing, "
            "avoid temperature extremes, and keep medication and water available."
        )
    if persona == "parent" and (uv_index is not None and uv_index >= 6):
        messages.append(
            "For children, add shade, hats, sunscreen, and regular water breaks."
        )
    if persona == "photographer":
        if "cloud" in condition.lower() or "overcast" in condition.lower():
            messages.append(
                "Cloud cover may provide soft, even light that can work well "
                "for portraits and street photography."
            )
        elif uv_index is not None and uv_index >= 6:
            messages.append(
                "Strong sun is expected; consider early or late light for a "
                "more comfortable outdoor shoot."
            )

    if not messages:
        messages.append(
            f"Conditions look reasonable for '{activity_text}' at the selected "
            f"time. Still check local official updates before leaving."
        )
    return messages


def _display_value(field, value):
    if field == "alerts":
        return ", ".join(value) if value else "No calculated advisory flags"
    if value is None:
        return "Not available"
    return value


def display_output(
    personalized_data,
    persona,
    activity_text,
    forecast_date,
    time_label,
    forecast_time,
    recommendation_messages,
    data_source,
):
    header = f"{personalized_data['state']} ({personalized_data['city']})"
    print("\n" + "=" * 72)
    print(f"  PERSONALIZED LIVE WEATHER - {persona.title()} @ {header}")
    print("=" * 72)
    print(f"  Forecast date            : {forecast_date.isoformat()}")
    print(f"  Planning time            : {time_label}")
    print(f"  Forecast hour used       : {forecast_time}")
    print(f"  Data source              : {data_source}")
    print("-" * 72)
    for field, value in personalized_data.items():
        if field in {"state", "city"}:
            continue
        label = FIELD_LABELS.get(field, field)
        print(f"  {label:<26}: {_display_value(field, value)}")
    print("=" * 72)

    print(f"\nActivity planned: {activity_text}")
    print("Recommendation:")
    for message in recommendation_messages:
        print(f"  - {message}")


def convert_to_json_output(
    personalized_data,
    activity_text,
    activity_category,
    recommendation_messages,
    forecast_date,
    time_label,
    forecast_time,
    data_source,
):
    output_data = dict(personalized_data)
    output_data.update(
        {
            "forecast_date": forecast_date.isoformat(),
            "planning_time": time_label,
            "forecast_time_used": forecast_time,
            "data_source": data_source,
            "activity": activity_text,
            "activity_category": activity_category,
            "recommendations": recommendation_messages,
        }
    )
    return json.dumps(output_data, indent=4)


def main():
    print(
        "SIH26076 - Mausam Personalized Homepage - "
        "Live Weather + Activity Advisory Module"
    )
    print(
        "Live hourly forecast: Open-Meteo | "
        "Timezone: Asia/Kolkata"
    )

    state_name, city_name = get_location()
    forecast_date = get_forecast_date()
    time_label, target_hour = get_time_of_day()

    try:
        raw_json_string = get_weather_json(
            state_name, city_name, forecast_date, target_hour
        )
    except WeatherServiceError as error:
        print(f"\nCould not retrieve live weather: {error}")
        print(
            "No simulated weather was shown. Please retry when the live "
            "weather service is reachable."
        )
        return

    weather_data = parse_weather_json(raw_json_string)
    if weather_data is None:
        print("Could not proceed because the live weather JSON was invalid.")
        return

    extracted_data = extract_weather_fields(weather_data)
    persona = get_user_persona()
    personalized_data = personalize_weather_data(
        extracted_data, persona, state_name, city_name
    )

    activity_text = get_user_activity()
    activity_category = classify_activity(activity_text)
    recommendation_messages = generate_recommendation(
        extracted_data, activity_category, activity_text, persona
    )

    display_output(
        personalized_data,
        persona,
        activity_text,
        forecast_date,
        time_label,
        weather_data["forecast_time"],
        recommendation_messages,
        weather_data["data_source"],
    )

    json_output = convert_to_json_output(
        personalized_data,
        activity_text,
        activity_category,
        recommendation_messages,
        forecast_date,
        time_label,
        weather_data["forecast_time"],
        weather_data["data_source"],
    )
    print("\nFinal personalized data as JSON (for handoff to other modules):")
    print(json_output)


if __name__ == "__main__":
    main()
