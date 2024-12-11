

"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function FollowersByCountry({metricsData}) {

  const followers = metricsData.followerDemographics
          .slice(0, 15) // Only show top 15 countries
          .map((entry, index) => ({
            ...entry,
            fill: ["#4A90E2", "#E94E77", "#50E3C2", "#F5A623"][index % 4], // Cycle through colors
          }));
  


  const topFifteen = followers.slice(0, 15);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Number of Followers by Country</h3>
        <p className="text-sm text-gray-500">Top 15 countries</p>
      </div>
      <div
        className="overflow-y-auto h-96 p-2 border rounded-lg shadow-inner"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#888 #eee" }}
      >
        <ResponsiveContainer width="100%" height={followers.length * 50}>
          <BarChart
            data={followers}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={150} // Adjusted width for long country names
            />
            <XAxis dataKey="count" type="number" hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                padding: "5px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
              }}
              formatter={(value) => `${value} followers`}
              labelStyle={{ fontWeight: "bold", color: "#333" }}
            />
            <Bar dataKey="count" radius={[0, 10, 10, 0]}>
              {topFifteen.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-sm text-gray-500 text-center mt-4">
        Showing follower distribution by country
      </div>
    </div>
  );
}