import { NextRequest, NextResponse } from "next/server";

// Weather code mapping from WMO standard codes
function mapWeatherCode(code: number): {
  condition: string;
  iconType: "cloudy-sun" | "sun" | "rain" | "thunder" | "wind" | "snow" | "moon";
  icon: string;
} {
  if (code === 0) {
    return { condition: "Clear Sky", iconType: "sun", icon: "☀️" };
  } else if (code === 1 || code === 2) {
    return { condition: "Partly Cloudy", iconType: "cloudy-sun", icon: "🌤️" };
  } else if (code === 3) {
    return { condition: "Overcast", iconType: "cloudy-sun", icon: "☁️" };
  } else if (code >= 45 && code <= 48) {
    return { condition: "Foggy", iconType: "cloudy-sun", icon: "🌫️" };
  } else if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) {
    return { condition: "Rainy", iconType: "rain", icon: "🌧️" };
  } else if (code >= 71 && code <= 77 || (code >= 85 && code <= 86)) {
    return { condition: "Snow", iconType: "snow", icon: "❄️" };
  } else if (code >= 95 && code <= 99) {
    return { condition: "Thunderstorm", iconType: "thunder", icon: "⚡" };
  }
  return { condition: "Cloudy", iconType: "cloudy-sun", icon: "⛅" };
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = parseFloat(searchParams.get("lat") || "28.6139"); // Default Delhi if empty
    const lon = parseFloat(searchParams.get("lon") || "77.2090");
    const locationName = searchParams.get("name") || "Current Location";
    const region = searchParams.get("region") || "";
    const country = searchParams.get("country") || "";

    const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,uv_index&hourly=temperature_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,uv_index_max&timezone=auto`;

    const res = await fetch(openMeteoUrl, { next: { revalidate: 300 } });
    
    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const hourly = data.hourly || { time: [], temperature_2m: [], weather_code: [] };
    const daily = data.daily || { time: [], weather_code: [], temperature_2m_max: [], temperature_2m_min: [] };

    const currentWeatherMapped = mapWeatherCode(current.weather_code || 0);

    // Format 24-hour hourly points (8 sampled intervals for clean display)
    const hourlyPoints = [];
    const step = Math.max(1, Math.floor(Math.min(hourly.time.length, 24) / 8));
    for (let i = 0; i < Math.min(hourly.time.length, 24); i += step) {
      const timeStr = hourly.time[i] ? new Date(hourly.time[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : `${i}:00`;
      const mapped = mapWeatherCode(hourly.weather_code?.[i] || 0);
      hourlyPoints.push({
        time: timeStr,
        temp: Math.round(hourly.temperature_2m?.[i] ?? current.temperature_2m ?? 20),
        condition: mapped.condition,
        icon: mapped.icon,
      });
      if (hourlyPoints.length === 8) break;
    }

    // Format 7-day forecast items
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const sevenDayForecast = [];
    for (let i = 0; i < Math.min(daily.time.length, 7); i++) {
      const d = new Date(daily.time[i]);
      const dayLabel = i === 0 ? 'Today' : dayNames[d.getDay()];
      const mapped = mapWeatherCode(daily.weather_code?.[i] || 0);
      sevenDayForecast.push({
        id: `day-${i}`,
        day: dayLabel,
        date: daily.time[i],
        icon: mapped.icon,
        highTemp: Math.round(daily.temperature_2m_max?.[i] ?? 22),
        lowTemp: Math.round(daily.temperature_2m_min?.[i] ?? 14),
        condition: mapped.condition,
        precipitation: daily.precipitation_sum?.[i] ?? 0,
      });
    }

    // Fetch live air quality telemetry concurrently
    let aqiData: {
      value: number;
      status: "Good" | "Moderate" | "Sensitive" | "Unhealthy" | "Hazardous";
      pm25: number;
      pm10: number;
      no2: number;
      o3: number;
    } = {
      value: 42,
      status: "Good",
      pm25: 9.2,
      pm10: 18.5,
      no2: 14.0,
      o3: 48.0,
    };

    try {
      const aqiUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi,pm10,pm2_5,nitrogen_dioxide,ozone`;
      const aqiRes = await fetch(aqiUrl, { next: { revalidate: 300 } });
      if (aqiRes.ok) {
        const aqiJson = await aqiRes.json();
        if (aqiJson?.current) {
          const val = Math.round(aqiJson.current.us_aqi ?? 42);
          let status: "Good" | "Moderate" | "Sensitive" | "Unhealthy" | "Hazardous" = "Good";
          if (val > 200) status = "Hazardous";
          else if (val > 150) status = "Unhealthy";
          else if (val > 100) status = "Sensitive";
          else if (val > 50) status = "Moderate";

          aqiData = {
            value: val,
            status,
            pm25: parseFloat((aqiJson.current.pm2_5 ?? 9.2).toFixed(1)),
            pm10: parseFloat((aqiJson.current.pm10 ?? 18.5).toFixed(1)),
            no2: parseFloat((aqiJson.current.nitrogen_dioxide ?? 14.0).toFixed(1)),
            o3: parseFloat((aqiJson.current.ozone ?? 48.0).toFixed(1)),
          };
        }
      }
    } catch {
      // Fallback aqiData is already safely preset
    }

    return NextResponse.json({
      success: true,
      location: {
        name: locationName,
        region,
        country,
        lat,
        lon,
      },
      current: {
        temp: Math.round(current.temperature_2m ?? 22),
        condition: currentWeatherMapped.condition,
        iconType: currentWeatherMapped.iconType,
        icon: currentWeatherMapped.icon,
        precipitation: Math.round(current.precipitation ?? 0),
        humidity: Math.round(current.relative_humidity_2m ?? 45),
        windSpeed: Math.round(current.wind_speed_10m ?? 12),
        uvIndex: current.uv_index ? Math.round(current.uv_index) : 4,
        apparentTemp: Math.round(current.apparent_temperature ?? current.temperature_2m ?? 22),
      },
      aqi: aqiData,
      hourlyPoints,
      sevenDayForecast,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Error fetching weather:", error);
    // Return structured graceful fallback if offline
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch weather data",
        fallback: true,
        current: {
          temp: 24,
          condition: "Pleasant",
          iconType: "cloudy-sun",
          icon: "🌤️",
          precipitation: 10,
          humidity: 48,
          windSpeed: 14,
          uvIndex: 4,
        },
        aqi: {
          value: 42,
          status: 'Good',
          pm25: 9.2,
          pm10: 18.5,
          no2: 14.0,
          o3: 48.0,
        },
      },
      { status: 500 }
    );
  }
}

