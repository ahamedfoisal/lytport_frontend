"use client";

import React from 'react';

const heatmapData = [
    {
      day: 'Mon',
      hours: [950, 1200, 1350, 1400, 1450, 1300, 1250, 1100, 950, 850, 1000, 1150, 1300, 1400, 1500, 1350, 1250, 1150, 900, 850, 1000, 1100, 1200, 1400],
    },
    {
      day: 'Tue',
      hours: [850, 950, 1050, 1200, 1300, 1350, 1400, 1500, 1450, 1350, 1250, 1150, 1050, 950, 900, 1100, 1200, 1300, 1350, 1250, 1150, 950, 850, 800],
    },
    {
      day: 'Wed',
      hours: [900, 1000, 1200, 1350, 1400, 1450, 1500, 1400, 1250, 1150, 1000, 900, 850, 1050, 1150, 1300, 1450, 1500, 1400, 1250, 1100, 950, 850, 800],
    },
    {
      day: 'Thu',
      hours: [800, 850, 950, 1100, 1250, 1350, 1400, 1450, 1500, 1400, 1250, 1150, 1000, 950, 900, 1200, 1300, 1350, 1450, 1400, 1250, 1150, 1050, 850],
    },
    {
      day: 'Fri',
      hours: [850, 900, 1050, 1200, 1350, 1400, 1450, 1500, 1400, 1300, 1150, 1050, 950, 850, 800, 1000, 1100, 1200, 1350, 1450, 1500, 1400, 1300, 1150],
    },
    {
      day: 'Sat',
      hours: [900, 1000, 1100, 1250, 1350, 1400, 1450, 1500, 1400, 1250, 1150, 1050, 950, 900, 850, 1000, 1200, 1350, 1400, 1500, 1450, 1350, 1250, 1150],
    },
    {
      day: 'Sun',
      hours: [800, 850, 950, 1000, 1200, 1350, 1400, 1450, 1500, 1400, 1250, 1100, 950, 850, 800, 1050, 1200, 1350, 1400, 1500, 1400, 1250, 1150, 950],
    },
  ];

// Utility function to determine color based on value
function getHeatmapColor(value) {
  if (value < 900) return 'bg-blue-100';
  if (value < 1000) return 'bg-blue-200';
  if (value < 1100) return 'bg-blue-300';
  if (value < 1200) return 'bg-blue-400';
  if (value < 1300) return 'bg-blue-500';
  if (value < 1400) return 'bg-blue-600';
  if (value < 1500) return 'bg-blue-700';
  return 'bg-blue-800';
}

export default function FollowersOnline() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-orange-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <span className="text-pink-500 mr-2">📸</span>
          Followers online - Hour
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

      {/* Heatmap */}
      <div className="overflow-auto">
        <table className="table-auto border-collapse w-full text-center">
          <thead>
            <tr>
              <th></th>
              {[...Array(24).keys()].map((hour) => (
                <th key={hour} className="p-2 text-xs">
                  {hour.toString().padStart(2, '0')}:00
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td className="p-2 font-bold">{row.day}</td>
                {row.hours.map((value, colIndex) => (
                  <td key={colIndex} className={`p-2 ${getHeatmapColor(value)}`}>
                    <span className="text-xs text-white">{value}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex justify-around text-sm text-gray-500">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-100 inline-block mr-2"></span>
          806 - 900
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-300 inline-block mr-2"></span>
          900 - 1000
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-500 inline-block mr-2"></span>
          1000 - 1100
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue-700 inline-block mr-2"></span>
          1100 - 1500
        </div>
      </div>
    </div>
  );
}