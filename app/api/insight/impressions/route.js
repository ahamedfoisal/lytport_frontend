
import { NextResponse } from "next/server";

export async function GET(request) {
  const IG_PROFILE_ID = process.env.IG_PROFILE_ID; // Instagram User ID
  const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN; // Access Token

  try {
    // Fetch weekly impressions for the last 7 weeks
    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=impressions&period=week&access_token=${IG_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      throw new Error("No impressions data found.");
    }

    // Extract weekly values
    const weeklyValues = data.data[0].values.slice(-7); // Get the last 7 weeks
    const weeklyImpressions = weeklyValues.map((week) => week.value);

    // Calculate total impressions for the last 6 weeks
    const totalImpressions = weeklyImpressions.slice(0, 6).reduce((sum, value) => sum + value, 0);

    // Calculate percentage change
    const lastWeek = weeklyImpressions[5] || 0;
    const previousWeek = weeklyImpressions[6] || 0;
    const percentageChange =
      previousWeek > 0 ? (((lastWeek - previousWeek) / previousWeek) * 100).toFixed(2) : "N/A";

    // Format response
    const responsePayload = {
      weeklyImpressions: weeklyImpressions.slice(0, 6), // Last 6 weeks
      totalImpressions,
      percentageChange: percentageChange !== "N/A" ? `${percentageChange}%` : "N/A",
    };

    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error("Error fetching impressions:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
// import {NextResponse} from "next/server";

// export async function GET(request) {
//     const dummy_data =   [150, 200, 300, 250, 320, 180, 210];

//     return NextResponse.json(dummy_data);

// }