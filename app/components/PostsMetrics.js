
"use client";

import React from "react";

export default function PostsMetrics({ metricsData }) {
  // If no metrics data is provided, return a placeholder or error state
  if (!metricsData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start border">
          <p>No metrics data available</p>
        </div>
      </div>
    );
  }

  // Prepare metrics based on the fetched data
  const metrics = [
    {
      id: 1,
      title: "Followers",
      value: metricsData.followers ? metricsData.followers.toLocaleString() : "0",
      description: "followers",
      icon: "👥",
    },
    {
      id: 2,
      title: "Post engagement rate",
      value: "6.23%", // This might need to be calculated or fetched from the API
      description: "engagement rate",
      icon: "📊",
    },
    {
      id: 3,
      title: "Post impressions",
      value: metricsData.monthlyImpressions?.totalImpressions 
        ? metricsData.monthlyImpressions.totalImpressions.toLocaleString() 
        : "0",
      description: "impressions",
      icon: "👁️",
    },
    {
      id: 4,
      title: "Post Reach",
      value: metricsData.reach?.totalReach30Days 
        ? metricsData.reach.totalReach30Days.toLocaleString() 
        : "0",
      description: "reach",
      icon: "📈",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start border relative hover:shadow-lg transition duration-300"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-pink-500">{metric.icon}</span>
              <h3 className="text-sm font-semibold">{metric.title}</h3>
            </div>
            <div className="flex items-center gap-1 text-gray-400">
              <button className="text-sm">
                <span role="img" aria-label="Help">
                  ❓
                </span>
              </button>
              <button className="text-sm">
                <span role="img" aria-label="Settings">
                  ⚙️
                </span>
              </button>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}