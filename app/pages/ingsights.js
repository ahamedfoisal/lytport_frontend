import React from 'react';
import NavBar from '@/app/components/navBar';
import ViewsPerDay from '@/app/components/ViewsPerDay';
import EngagementByTime from '@/app/components/EngagementByTime';
import FollowersByCountry from '@/app/components/FollowersByCountry';
import Impressions from '@/app/components/Impressions';

export default function Insights() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="mt-4 max-w-7xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">Insights</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ViewsPerDay />
          <EngagementByTime />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FollowersByCountry />
          <Impressions />
        </div>
      </main>
    </div>
  );
}