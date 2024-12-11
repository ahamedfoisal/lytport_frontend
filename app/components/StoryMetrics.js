"use client";

import React from 'react';

const metrics = [
  { title: 'Story Replies', value: '56', description: 'replies', icon: '📸' },
  { title: 'Story Exits', value: '48,339', description: 'exits', icon: '📸' },
  { title: 'Story Taps Back', value: '31,987', description: 'taps back', icon: '📸' },
  { title: 'Story Taps Forward', value: '297,334', description: 'taps forward', icon: '📸' },
];

export default function StoryMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`bg-white p-6 rounded-lg shadow-md relative ${
            index === 2 ? 'border-orange-300 border' : ''
          }`}
        >
          {/* Title with Icon */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <span className="text-pink-500 mr-2">{metric.icon}</span>
              {metric.title}
            </h3>
            {/* Icons for Help and Settings */}
            {index === 2 && (
              <div className="flex items-center gap-2 text-gray-400">
                <button className="hover:text-gray-600">
                  <span role="img" aria-label="help">❓</span>
                </button>
                <button className="hover:text-gray-600">
                  <span role="img" aria-label="settings">⚙️</span>
                </button>
              </div>
            )}
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