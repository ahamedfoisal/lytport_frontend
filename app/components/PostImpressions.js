
"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function PostImpressions({metricsData}) {

 

  const { monthlyImpressions } = metricsData;

        // Format data for the chart
  const data = monthlyImpressions.dailyImpressions.map(({ date, impressions }) => ({
    date,
    impressions,
  }))



  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-orange-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <span className="mr-2 text-pink-500">📸</span> Post Impressions
        </h3>
        <div className="flex items-center gap-2 text-gray-400">
          <button className="hover:text-gray-600">
            <span role="img" aria-label="help">❓</span>
          </button>
          <button className="hover:text-gray-600">
            <span role="img" aria-label="settings">⚙️</span>
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              borderRadius: "5px",
              color: "#fff",
              padding: "10px",
            }}
            labelStyle={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}
            formatter={(value) => [`${value} impressions`, "Post impressions"]}
          />
          <Line type="monotone" dataKey="impressions" stroke="#4A90E2" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}