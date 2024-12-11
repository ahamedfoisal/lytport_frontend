// app/components/EngagementByTime.js

"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Suspense } from "react";
import LoadingSpinner from "./loader";



export default function EngagementByTime() {
  const [totalEngagement, setTotalEngagement] = useState(0);
  const [engagementData, setEngagementData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('/api/insight/engagementByTime');
        const res = await data.json();
        setEngagementData(res);

        const totalEngagement = React.useMemo(() => {
          return engagementData.reduce((acc, curr) => acc + curr.value, 0);
        }, []);
        
        setTotalEngagement(totalEngagement);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!engagementData) return  (
    <Suspense fallback={<LoadingSpinner />}>
      <LoadingSpinner />
    </Suspense>
  );


  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-black flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">Engagement by Time</h3>
      <PieChart width={250} height={250}>
        <Pie
          data={engagementData}
          dataKey="value"
          nameKey="time"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          stroke="none"
        >
          <Label
            position="center"
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {totalEngagement}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Total
                    </tspan>
                  </text>
                );
              }
            }}
          />
          {engagementData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {/* Tooltip Component for hover effect */}
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-gray-700 text-white text-xs p-2 rounded">
                  <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
      <div className="mt-4 flex justify-around w-full">
        {engagementData.map((entry) => (
          <div key={entry.time} className="text-center">
            <p className="text-2xl font-bold" style={{ color: entry.color }}>
              {entry.value}%
            </p>
            <p className="text-xs text-gray-500">{entry.time}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm flex items-center gap-2">
        <span className="text-green-500 font-semibold">Trending up by 5.2% this month</span>
        <TrendingUp className="h-4 w-4 text-green-500" />
      </div>
      <p className="text-xs text-gray-400 mt-2">Showing total engagement for different times of the day</p>
    </div>
  );
}