"use client";

import React, { Suspense } from 'react';
import { useEffect, useState } from 'react';
import LoadingSpinner from './loader';

export default function Metrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch('/api/dashboard/metrics');
        const metrics = await data.json();
        setMetrics(metrics);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (!metrics)
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <LoadingSpinner />
      </Suspense>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <div
          key={metric.name}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
            {metric.name}
          </h3>
          <div className="text-3xl font-bold text-blue-600 my-2">{metric.value}</div>
          <p
            className={`text-sm font-medium ${
              metric.change.includes('-') ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {metric.change}
          </p>
          <p className="text-xs text-gray-400">From last month</p>
        </div>
      ))}
    </div>
  );
}