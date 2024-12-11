import { NextResponse } from "next/server";
import db from '../../../../lib/db';

export async function GET(request) {
    let data = await db.query('select * from user_client');
    data = data[0];

    let arr = [];
    data = Object.entries(data);
    const target_list = ['followers_count', 'following_count'];

    for (let i = 0; i < data.length; i++) {
        if (!target_list.includes(data[i][0])) continue;

        arr.push({
            name: data[i][0].split("_").join(" "),
            value: data[i][1],
            change: "+3.1%"
        })
    }


    ///todo: the following are yet to be added to our database columns
    arr.push({
        name: "Views",
        value: "52,000",
        change: "+2.1%"
    })

    arr.push({
        name: "Engagements",
        value: "50%",
        change: "+2.1%"
    })

    return NextResponse.json(arr, {status: 200});

}

// import { NextResponse } from "next/server";

// export async function GET(request) {
//   const IG_PROFILE_ID = process.env.IG_PROFILE_ID; // Instagram User ID
//   const IG_ACCESS_TOKEN = process.env.IG_ACCESS_TOKEN; // Access Token

//   try {
//     // Fetch current metrics
//     const currentMetricsUrl = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=follower_count,profile_views,total_interactions&period=day&access_token=${IG_ACCESS_TOKEN}`;
//     const currentResponse = await fetch(currentMetricsUrl);
//     const currentData = await currentResponse.json();

//     // Fetch previous month metrics
//     const now = new Date();
//     const oneMonthAgo = new Date();
//     oneMonthAgo.setMonth(now.getMonth() - 1);

//     const since = Math.floor(oneMonthAgo.getTime() / 1000); // Unix timestamp for 1 month ago
//     const until = Math.floor(now.getTime() / 1000); // Unix timestamp for today

//     const previousMetricsUrl = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=follower_count,profile_views,total_interactions&period=day&since=${since}&until=${until}&access_token=${IG_ACCESS_TOKEN}`;
//     const previousResponse = await fetch(previousMetricsUrl);
//     const previousData = await previousResponse.json();

//     // Map metrics and calculate percentage change
//     const metrics = [
//       {
//         name: "Followers",
//         current: currentData.data.find((m) => m.name === "follower_count")?.values[0]?.value || 0,
//         previous: previousData.data.find((m) => m.name === "follower_count")?.values[0]?.value || 0,
//       },
//       {
//         name: "Profile Views",
//         current: currentData.data.find((m) => m.name === "profile_views")?.values[0]?.value || 0,
//         previous: previousData.data.find((m) => m.name === "profile_views")?.values[0]?.value || 0,
//       },
//       {
//         name: "Engagement",
//         current: currentData.data.find((m) => m.name === "total_interactions")?.values[0]?.value || 0,
//         previous: previousData.data.find((m) => m.name === "total_interactions")?.values[0]?.value || 0,
//       },
//     ];

//     const formattedMetrics = metrics.map(({ name, current, previous }) => {
//       const change = previous
//         ? (((current - previous) / previous) * 100).toFixed(2) + "%"
//         : "N/A";

//       return {
//         name,
//         value: current,
//         change,
//       };
//     });

//     return NextResponse.json(formattedMetrics);
//   } catch (error) {
//     console.error("Error fetching metrics:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch metrics. Please try again later." },
//       { status: 500 }
//     );
//   }
// }