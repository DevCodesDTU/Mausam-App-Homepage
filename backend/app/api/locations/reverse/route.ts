import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lat = parseFloat(searchParams.get("lat") || "0");
    const lon = parseFloat(searchParams.get("lon") || "0");

    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json(
        { success: false, error: "Invalid coordinates" },
        { status: 400 }
      );
    }

    // Try reverse geocoding with Nominatim / BigDataCloud free client
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const res = await fetch(nominatimUrl, {
      headers: {
        "User-Agent": "MausamWeatherApp/1.0",
      },
    });

    if (res.ok) {
      const data = await res.json();
      const address = data.address || {};
      const cityName =
        address.city ||
        address.town ||
        address.village ||
        address.suburb ||
        address.municipality ||
        address.county ||
        "Current Location";
      const regionName = address.state || address.region || address.state_district || "";
      const countryName = address.country || "";

      return NextResponse.json({
        success: true,
        location: {
          name: cityName,
          region: regionName,
          country: countryName,
          lat,
          lon,
          displayName: data.display_name || `${cityName}, ${regionName}`,
        },
      });
    }

    // Fallback if nominatim is unavailable
    return NextResponse.json({
      success: true,
      location: {
        name: "Current GPS Location",
        region: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
        country: "",
        lat,
        lon,
      },
    });
  } catch (error: any) {
    console.error("Reverse geocoding error:", error);
    return NextResponse.json({
      success: true,
      location: {
        name: "Current GPS Location",
        region: "",
        country: "",
        lat: 0,
        lon: 0,
      },
    });
  }
}

