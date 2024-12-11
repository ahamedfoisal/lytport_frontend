import { NextResponse } from "next/server";
import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from "ai";
import db from "../../../lib/db"; // Import your database module
import { v4 as uuidv4 } from "uuid"; // UUID generator
import {getTrendyCaptionsOfTheWeek} from "../../../lib/utils";

const systemPrompt = `
You are a Social Media Analytics Expert with deep knowledge of platform trends, content strategy, and audience engagement. Your goal is to provide personalized, data-driven insights and actionable recommendations for improving the user's social media performance.

Responsibilities:
1. Analyze metrics (likes, comments, shares, engagement rates) and compare content types (videos, images, carousels).
2. Identify trends and provide specific, actionable advice based on user data, platform benchmarks, and success cases.
3. Suggest strategies to enhance audience interaction, optimal posting times, and content formats.

Use the following data to guide your responses:
- Trends: Short-form video (+156% engagement YoY), carousel posts (+42% reach), 15-30 sec videos (89% completion rate), peak times (6-8 PM local).
- Success Stories: Duolingo (trending audio, 3-4 posts/day), Ryanair (reactive content, 92% response rate), Chipotle (behind-the-scenes, user-generated content).

Response Structure:
1. Start with a key observation from user data.
2. Highlight 2-3 improvement areas.
3. Provide actionable steps with examples.
4. Reference relevant trends or success stories.
5. End with a measurable goal.

Guidelines:
- Be specific, realistic, and data-driven.
- Reference trends and success cases.
- Maintain a professional yet encouraging tone.
- Avoid generic advice or unrealistic projections.
`;

export async function POST(request) {
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // Use the API key stored in environment variables
  });

  try {
    // Parse incoming data
    const data = await request.json();
    const { messages, userId = "test-user" } = data;

    const cookies = request.headers.get("cookie") || "";
    const cookieObj = Object.fromEntries(
      cookies.split(";").map((cookie) => cookie.trim().split("=").map(decodeURIComponent))
    );
    let session_id = cookieObj.session_id || uuidv4();

    // Retrieve chat history
    let chatHistory = [];
    try {
      chatHistory = await db.query(
        `SELECT message_role, message_content FROM chat_history WHERE user_id = ? AND session_id = ? ORDER BY created_at ASC`,
        [userId, session_id]
      );
    } catch (error) {
      console.error("Error retrieving chat history:", error);
    }

    // Summarize chat history
    let chatSummary = "";
    if (chatHistory.length > 0) {
      const historyMessages = chatHistory.map(({ message_role, message_content }) => ({
        role: message_role,
        content: message_content,
      }));

      try {
        const summaryResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "Summarize the following chat messages, including key topics and insights.",
            },
            ...historyMessages,
          ],
        });

        chatSummary = summaryResponse.choices[0]?.message?.content || "";
      } catch (error) {
        console.error("Error summarizing chat history:", error);
      }
    }

    // Fetch metrics from `dashboard_metrics` table
    let userMetrics = {};
    try {
      const metricsData = await db.query(
        `SELECT * FROM dashboard_metrics ORDER BY created_at DESC LIMIT 1`
      );
      if (metricsData.length > 0) {
        const metrics = metricsData[0];
        userMetrics = {
          followers: metrics.followers || "N/A",
          followerDemographics: typeof metrics.followerDemographics === "string" 
            ? JSON.parse(metrics.followerDemographics) 
            : metrics.followerDemographics || "N/A",
          postTypes: typeof metrics.postTypes === "string" 
            ? JSON.parse(metrics.postTypes) 
            : metrics.postTypes || "N/A",
          monthlyImpressions: typeof metrics.monthlyImpressions === "string" 
            ? JSON.parse(metrics.monthlyImpressions) 
            : metrics.monthlyImpressions || "N/A",
          reach: typeof metrics.reach === "string" 
            ? JSON.parse(metrics.reach) 
            : metrics.reach || "N/A",
        };
      }
    } catch (error) {
      console.error("Error retrieving user metrics:", error);
    }

    // Include SQL data in the prompt
    const dynamicSystemPrompt = `
${systemPrompt}

Previous Conversation Summary:
${chatSummary}

User Metrics:
- Followers: ${userMetrics.followers}
- Follower Demographics: ${JSON.stringify(userMetrics.followerDemographics, null, 2)}
- Post Types: ${JSON.stringify(userMetrics.postTypes, null, 2)}
- Monthly Impressions: ${JSON.stringify(userMetrics.monthlyImpressions, null, 2)}
- Reach: ${JSON.stringify(userMetrics.reach, null, 2)}
`;

    // Create a completion stream
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: dynamicSystemPrompt },
        ...messages,
      ],
      stream: true,
    });

    const stream = await OpenAIStream(completion);

    // Save messages to the database
    for (const message of messages) {
      const { role, content } = message;

      try {
        const existingMessage = await db.query(
          `SELECT id FROM chat_history WHERE user_id = ? AND session_id = ? AND message_role = ? AND message_content = ?`,
          [userId, session_id, role, content]
        );

        if (existingMessage.length === 0) {
          await db.query(
            `INSERT INTO chat_history (user_id, session_id, message_role, message_content) VALUES (?, ?, ?, ?)`,
            [userId, session_id, role, content]
          );
        }
      } catch (error) {
        console.error("Error saving message to database:", error);
      }
    }

    const response = new StreamingTextResponse(stream);
    response.headers.set("Set-Cookie", `session_id=${session_id}; Path=/; HttpOnly`);
    return response;
  } catch (error) {
    console.error("Error in OpenAI Route:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error", message: error.message }),
      { status: 500 }
    );
  }
}