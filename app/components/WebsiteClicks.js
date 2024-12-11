"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: 'Oct 23', clicks: 5 },
  { date: 'Nov 23', clicks: 10 },
  { date: 'Apr 24', clicks: 15 },
  { date: 'Jul 24', clicks: 8 },
  { date: 'Oct 24', clicks: 12 },
];

export default function WebsiteClicks() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <span className="text-pink-500 mr-2">📸</span>
          Website clicks
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              borderRadius: '5px',
              color: '#fff',
              padding: '10px',
            }}
            labelStyle={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}
            formatter={(value) => [`${value} clicks`, 'Website clicks']}
          />
          <Line type="monotone" dataKey="clicks" stroke="#4A90E2" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}