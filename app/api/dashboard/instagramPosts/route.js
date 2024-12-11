import { NextResponse } from "next/server";

export async function GET(request) {
  const IG_PROFILE_ID = process.env.IG_PROFILE_ID; // Instagram User ID
  const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN; // Access Token

  try {
    // Step 1: Fetch media list with required fields
    const mediaListResponse = await fetch(
      `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/media?fields=id,media_type,timestamp,like_count,comments_count,caption,media_url,insights.metric(video_views)&access_token=${IG_ACCESS_TOKEN}`
    );
    const mediaListData = await mediaListResponse.json();

    // Check if media data exists
    if (!mediaListData.data) {
      throw new Error("No media data found.");
    }

    // Step 2: Format the media data
    const formattedData = mediaListData.data.map((media) => {
      const isVideo = media.media_type === "VIDEO";
    //   console.log(media);
      return {
        id: media.id,
        timestamp: media.timestamp,
        media_type: media.media_type,
        like_count: media.like_count || 0, // Default to 0 if undefined
        comments_count: media.comments_count || 0, // Default to 0 if undefined
        // views: isVideo ? media.insights?.data?.find((metric) => metric.name === "video_views")?.values?.[0]?.value || 0 : null, // Fetch views if video
        // duration: isVideo ? media.video_duration || null : null, // Duration for videos
        caption_size: media.caption ? media.caption.length : 0, // Caption length
        day: new Date(media.timestamp).toLocaleDateString("en-US", { weekday: "long" }), // Day of the week
        // time: new Date(media.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), // Time of day
        time: new Date(media.timestamp).toLocaleTimeString("en-US", { 
            hour: "2-digit", 
            minute: "2-digit", 
            hourCycle: "h23" // Use 24-hour format
          }),
        engagement: (media.like_count || 0) + (media.comments_count || 0), // Likes + Comments
      };
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch Instagram posts. Please try again later." },
      { status: 500 }
    );
  }
}
