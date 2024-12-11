// import { NextResponse } from "next/server";

// export async function GET(request) {
//     const dummy_data =  [
//             { name: 'Images', value: 140 },
//             { name: 'Reels', value: 100 },
//             { name: 'Carousels', value: 89 },
//             { name: 'Stories', value: 189 },
//           ]

//     return NextResponse.json(dummy_data);

// }


import { NextResponse } from "next/server";

export async function GET(request) {
  const IG_PROFILE_ID = process.env.IG_PROFILE_ID; // Instagram User ID
  const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN; // Access Token

  try {
    // Step 1: Fetch media list
    const mediaListResponse = await fetch(
      `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/media?fields=id,media_type&access_token=${IG_ACCESS_TOKEN}`
    );
    const mediaListData = await mediaListResponse.json();

    // Check if media data exists
    if (!mediaListData.data) {
      throw new Error("No media data found.");
    }

    // Step 2: Aggregate post types
    const postTypes = mediaListData.data.reduce((acc, media) => {
      const type = media.media_type;
      acc[type] = (acc[type] || 0) + 1; // Count each type
      return acc;
    }, {});

    // Step 3: Format response data
    const formattedData = Object.entries(postTypes).map(([type, count]) => ({
      name: type,
      value: count,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching post types:", error);
    return NextResponse.json(
      { error: "Failed to fetch post types. Please try again later." },
      { status: 500 }
    );
  }
}