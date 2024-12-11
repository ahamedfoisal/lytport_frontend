import React from 'react';
import NavBar from '@/app/components/navBar';
import PostCorrelation from '@/app/components/postCorrelation';
import PostGraph from '@/app/components/postsgraph';
export default function Insights() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Correlation</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PostCorrelation />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          < PostGraph />
        </div>
      </main>
    </div>
  );
}
