import { NextResponse } from "next/server";

export async function GET(request) {
  const IG_PROFILE_ID = process.env.IG_PROFILE_ID; 
  const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN; 

  try {
    // Fetch follower demographics by country
    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=follower_demographics&period=lifetime&metric_type=total_value&breakdown=country&access_token=${IG_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error("No follower demographic data found.");
    }

    // Process and sort the data
    const breakdown = data.data[0]?.total_value?.breakdowns[0];
    if (!breakdown || !breakdown.results) {
      throw new Error("Invalid response format for demographics.");
    }

    const followersByCountry = breakdown.results
      .map((result) => ({
        country: result.dimension_values[0], // Country name
        count: result.value, // Follower count
      }))
      .sort((a, b) => b.count - a.count); // Sort descending by count

    return NextResponse.json(followersByCountry);
  } catch (error) {
    console.error("Error fetching follower demographics:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}