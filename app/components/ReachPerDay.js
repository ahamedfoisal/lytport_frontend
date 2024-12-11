

"use client";

import React, { Suspense } from "react";
import LoadingSpinner from "./loader";

export default function ReachPerDay({metricsData}) {


  if (!metricsData || !metricsData.reach || !metricsData.reach.reach7Days) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md flex justify-center items-center">
        <p>No reach data available</p>
      </div>
    );
  }
  const percentageChange = 2.1;
  
  const reachData = metricsData.reach.reach7Days;
  const reachValues = reachData.map((day) => day.reach);
  const totalReach = reachValues.reduce((sum, value) => sum + value, 0);


  if (!reachData.length)
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoadingSpinner />
      </Suspense>
    );

  const maxValue = Math.max(...reachData.map((item) => item.reach)); // Normalize bar heights

  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black">
      <h3 className="text-lg font-semibold mb-2">Reach Per Day</h3>
      <p className="text-3xl font-bold">{totalReach.toLocaleString()}</p>
      <p className="text-sm text-green-500 mb-4">
        ↑ {percentageChange}% vs last week
      </p>

      <div className="flex justify-between items-end h-40 bg-white-100">
        {reachData.map((day, index) => (
          <div key={index} className="flex flex-col items-center relative">
            {/* Tooltip */}
            <div
              className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 transition-opacity duration-300"
              style={{ transform: "translateY(-100%)" }}
            >
              {day.reach}
            </div>
            {/* Bar */}
            <div
              className="bg-blue-500 w-8 rounded-t hover:bg-blue-600 cursor-pointer"
              style={{
                height: `${(day.reach / maxValue) * 120 + 20}px`, // Normalize bar height
              }}
              onMouseEnter={(e) =>
                e.currentTarget.previousSibling.classList.add("opacity-100")
              }
              onMouseLeave={(e) =>
                e.currentTarget.previousSibling.classList.remove("opacity-100")
              }
            ></div>
            <span className="text-xs mt-1 text-gray-600">{day.date}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        Showing total reach for the last 7 days
      </p>
    </div>
  );
}
