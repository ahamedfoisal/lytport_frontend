"use client";

import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Reel', value: 898, percentage: '78%', color: '#4A90E2' },
  { name: 'Carousel album', value: 126, percentage: '11%', color: '#F5A623' },
  { name: 'Photo post', value: 70, percentage: '6%', color: '#50E3C2' },
  { name: 'Story', value: 56, percentage: '5%', color: '#BD10E0' },
];

export default function PostCommentsByType() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">📸 Post comments - Post type</h3>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Donut Chart */}
        <div className="flex-1 flex justify-center">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Table */}
        <div className="flex-1">
          <table className="w-full text-left border-collapse">
            <tbody>
              {data.map((entry, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50"
                  style={{
                    backgroundColor: entry.color,
                    color: '#fff',
                    borderBottom: '2px solid #fff',
                  }}
                >
                  <td className="py-2 px-4 text-sm font-bold">{entry.percentage}</td>
                  <td className="py-2 px-4 text-sm">{entry.name}</td>
                  <td className="py-2 px-4 text-sm font-bold">{entry.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}