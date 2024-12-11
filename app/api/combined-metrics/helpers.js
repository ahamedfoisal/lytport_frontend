async function fetchFollowerDemographics(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=follower_demographics&period=lifetime&metric_type=total_value&breakdown=country&access_token=${IG_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data || data.data.length === 0) {
        throw new Error("No follower demographic data found.");
    }

    const breakdown = data.data[0]?.total_value?.breakdowns[0];
    if (!breakdown || !breakdown.results) {
        throw new Error("Invalid response format for demographics.");
    }

    return breakdown.results
        .map((result) => ({
            country: result.dimension_values[0],
            count: result.value,
        }))
        .sort((a, b) => b.count - a.count);
}

async function fetchPostTypes(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/media?fields=id,media_type&access_token=${IG_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.data) {
        throw new Error("No media data found.");
    }

    const postTypes = data.data.reduce((acc, media) => {
        const type = media.media_type;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {});

    return Object.entries(postTypes).map(([type, count]) => ({
        name: type,
        value: count,
    }));
}


async function fetchMonthlyImpressions(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const sinceTimestamp = Math.floor(thirtyDaysAgo.getTime() / 1000);
    const untilTimestamp = Math.floor(now.getTime() / 1000);

    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=impressions&period=day&since=${sinceTimestamp}&until=${untilTimestamp}&access_token=${IG_ACCESS_TOKEN}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data)

    if (!data.data || data.data.length === 0) {
        throw new Error("No impressions data found.");
    }
    
    const dailyImpressions = data.data[0].values.map((entry) => ({
        date: entry.end_time,
        impressions: entry.value,
    }));

    const totalImpressions = dailyImpressions.reduce((sum, entry) => sum + entry.impressions, 0);

    return {
        dailyImpressions,
        totalImpressions,
    };
}

async function fetchFollowers(IG_PROFILE_ID,IG_ACCESS_TOKEN){
    const url = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}?fields=followers_count&access_token=${IG_ACCESS_TOKEN}`;
    const response = await fetch(url)
    const data = await response.json()
    
    if(!data || typeof data.followers_count ==="undefined"){
        throw new Error("No Followers Found")
    }

    return {
        followers_count: data.followers_count
    }
    

}

async function fetchReach(IG_PROFILE_ID, IG_ACCESS_TOKEN) {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    const sevenDaysAgo = new Date();

    // Calculate dates
    thirtyDaysAgo.setDate(now.getDate() - 30);
    sevenDaysAgo.setDate(now.getDate() - 7);

    const since30Days = Math.floor(thirtyDaysAgo.getTime() / 1000); // 30 days ago timestamp
    const since7Days = Math.floor(sevenDaysAgo.getTime() / 1000);   // 7 days ago timestamp
    const untilTimestamp = Math.floor(now.getTime() / 1000);        // Current timestamp

    // URL to fetch 30 days reach data
    const url30Days = `https://graph.facebook.com/v21.0/${IG_PROFILE_ID}/insights?metric=reach&period=day&since=${since30Days}&until=${untilTimestamp}&access_token=${IG_ACCESS_TOKEN}`;

    // Fetch 30-day reach data
    const response30Days = await fetch(url30Days);
    const data30Days = await response30Days.json();

    if (!data30Days.data || data30Days.data.length === 0) {
        throw new Error("No reach data found for the last 30 days.");
    }

    // Extract and format reach values for the last 30 days
    const reachValues = data30Days.data[0].values;

    // Total reach for 30 days
    const totalReach30Days = reachValues.reduce((sum, entry) => sum + entry.value, 0);

    // Filter reach data for the last 7 days
    const reach7Days = reachValues.filter((entry) => {
        const entryTimestamp = new Date(entry.end_time).getTime() / 1000;
        return entryTimestamp >= since7Days && entryTimestamp <= untilTimestamp;
    });

    // Format data for the bar chart: { date: "DD/MM/YY", reach: number }
    const barChartData = reach7Days.map((entry) => ({
        date: new Date(entry.end_time).toLocaleDateString("en-GB"), // Format as DD/MM/YY
        reach: entry.value,
    }));

    return {
        totalReach30Days,
        reach7Days: barChartData,
    };
}

export{fetchFollowerDemographics,fetchPostTypes,fetchMonthlyImpressions,fetchFollowers, fetchReach};