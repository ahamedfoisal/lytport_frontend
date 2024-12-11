"use client";

import React from 'react';

const metrics = [
  { title: 'Emails', value: '26', description: 'email taps', icon: '📸' },
  { title: 'Calls', value: '0', description: 'call taps', icon: '📸' },
];

export default function ContactMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-md relative"
        >
          {/* Title with Icon */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <span className="text-pink-500 mr-2">{metric.icon}</span>
              {metric.title}
            </h3>
          </div>

          {/* Value and Description */}
          <div>
            <p className="text-3xl font-bold">{metric.value}</p>
            <p className="text-sm text-gray-500">{metric.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}