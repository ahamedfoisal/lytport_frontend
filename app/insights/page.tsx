"use client";

import React from 'react';
import NavBar from '../components/navBar';
import PostCorrelation from '../components/postCorrelation';
import PostGraph from '../components/postsgraph';
import InteractiveGraph from '../components/graph/InteractiveGraph';

export default function Insights() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Insights</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <PostCorrelation />
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <PostGraph />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div className="bg-white shadow-md rounded-lg p-4 col-span-2">
            <InteractiveGraph />
          </div>
        </div>
      </main>
    </div>
  );
}
