import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("q") || "";

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ success: true, results: [] });
    }

    const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query.trim()
    )}&count=10&language=en&format=json`;

    const res = await fetch(geocodingUrl);
    if (!res.ok) {
      throw new Error(`Geocoding error: ${res.status}`);
    }

    const data = await res.json();
    const results = (data.results || []).map((item: any) => ({
      id: `${item.id || item.name}-${item.latitude}-${item.longitude}`,
      name: item.name,
      region: item.admin1 || item.admin2 || "",
      country: item.country || "",
      countryCode: item.country_code || "",
      lat: item.latitude,
      lon: item.longitude,
      timezone: item.timezone || "auto",
      elevation: item.elevation || 0,
    }));

    return NextResponse.json({
      success: true,
      query,
      results,
    });
  } catch (error: any) {
    console.error("Location search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to search location",
        results: [],
      },
      { status: 500 }
    );
  }
}

