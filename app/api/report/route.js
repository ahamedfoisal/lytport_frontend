


// import OpenAI from "openai";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { selectedTiles, combinedMetrics } = await request.json();

//     const client = new OpenAI({
//       apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
//     });

//     const systemPrompt = `
//       You are a top 1% expert in Data Analysis for content creation and viral creative idea generation.
//       you speak to the user in a simple and accessible language/tone.
//       Here is some context on what you should do:
//       Selected tiles to primarily focus on: ${selectedTiles.join(", ")}

//       all the data in your disposal for this:
//       ${JSON.stringify(combinedMetrics, null, 2)}
//      you use your skills to make informed guided decision on this on the information you give your user. 
//       you usually write about 500 to 800-word report summarizing in HTML format:
//       1. Summary of content, observations, and trends ( include numbers and dates to help the user understand ).
//       2. Actionable Recommendations to improve social media engagement.
//       3. Actionable strategies inspired by top influencers.
//       4. Ideas for future initiatives.

//       Only output HTML <div>content</div> no need to put /n to come back to the line.
//     `;

// //     const completion = await client.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: systemPrompt },
//         { role: "user", content: "Generate the well design HMTL report." },
//       ],
//     });

//     const generatedReport = completion.choices[0].message.content;
//     const reportHTML = `
//       <html>
//         <head>
//             <title>Social Media Insights Report</title>
//             <style>
//                 body {
//                     font-family: Arial, sans-serif;
//                     margin: 30px;
//                     line-height: 1.6;
//                 }
//                 h1 {
//                     text-align: center;
//                     color: #333;
//                 }
//                 h2 {
//                     color: #333;
//                 }
//                 .section {
//                     margin-bottom: 30px;
//                 }
//                 .graph {
//                     margin-top: 20px;
//                     text-align: center;
//                 }
//                 .graph img {
//                     max-width: 100%;
//                     height: auto;
//                 }
//             </style>
//         </head>
//         <body>
//             <h1>Social Media Insights Report</h1>

//             <div class="section">
//                 <h2>Report</h2>
//                 <div>${generatedReport}</div>
//             </div>
//         </body>
//       </html>
//     `;

//     return NextResponse.json({ reportHTML });
//   } catch (error) {
//     console.error("Error generating report:", error);
//     return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
//   }
// }


import OpenAI from "openai";
import { NextResponse } from "next/server";
import generateCharts from "./helper"; // Import the helper function

export async function POST(request) {
  try {
    const { selectedTiles, combinedMetrics } = await request.json();

    const client = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    // System prompt to structure the content
    const systemPrompt = `
      You are a top 1% expert in Data Analysis for content creation and viral creative idea generation.
      you speak to the user in a simple and accessible language/tone.
      Here is some context on what you should do:
      Selected tiles to primarily focus on: ${selectedTiles.join(", ")}

      all the data in your disposal for this:
      ${JSON.stringify(combinedMetrics, null, 2)}
     you use your skills to make informed guided decision on this on the information you give your user. 
      you usually write about 500 to 800-word report summarizing in HTML format:
      1. Summary of content, observations, and trends ( include numbers and dates to help the user understand ).
      2. Actionable Recommendations to improve social media engagement.
      3. Actionable strategies inspired by top influencers.
      4. Ideas for future initiatives.

      Only output HTML <div>content</div> no need to put /n to come back to the line.
    `;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Generate the report." },
      ],
    });

    const generatedReport = completion.choices[0].message.content;

    // Generate charts dynamically using the helper function
    const chartHTML = generateCharts(selectedTiles, combinedMetrics);

    // Wrap the report content inside a styled HTML template
    const reportHTML = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Social Media Insights Report</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 30px;
                    line-height: 1.6;
                    color: #333;
                }
                h1, h2 {
                    color: #333;
                    text-align: center;
                }
                .section {
                    margin-bottom: 40px;
                }
                canvas {
                    margin: 20px auto;
                    display: block;
                }
                .report-content {
                    margin: 20px 0;
                }
            </style>
        </head>
        <body>
            <h1>Social Media Insights Report</h1>

            <div class="section report-content">
                <h2>Detailed Analysis</h2>
                <div>${generatedReport}</div>
            </div>

            <!-- Charts Section -->
            <div class="section">
                <h2>Visualized Metrics</h2>
                ${chartHTML}
            </div>
        </body>
      </html>
    `;
    console.log(reportHTML)

    return NextResponse.json({ reportHTML });
  } catch (error) {
    console.error("Error generating report:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 }
    );
  }
}
