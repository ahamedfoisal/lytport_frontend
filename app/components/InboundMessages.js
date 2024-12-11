"use client";

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Neutral', value: 65, color: '#D3D3D3' },
  { name: 'Positive', value: 25, color: '#32CD32' },
  { name: 'Negative', value: 10, color: '#FF4500' },
];

export default function InboundMessages() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
        <span role="img" aria-label="camera" className="mr-2">📸</span>
        Inbound Messages
      </h3>
      <div className="flex justify-between items-center">
        {/* Pie Chart Section */}
        <div className="flex-1 flex justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Legend Section */}
        <div className="flex-1 ml-6">
          <ul className="space-y-2">
            {data.map((item, index) => (
              <li key={index} className="flex items-center">
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-sm font-medium">{item.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}