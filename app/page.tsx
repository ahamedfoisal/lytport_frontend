'use client';

import Dashboard from "./components/dashboard";
import HeroSection from "./components/marketing/Hero";
import NavBar from "./components/marketing/NavBar";
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import DashboardPage from "./dashboard/page";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser(); // Use `isLoaded` to ensure the user state is resolved

  // Show a loading indicator while the authentication state is being determined
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If the user is signed in, render the Dashboard component
  if (isSignedIn) {
    return <DashboardPage />;
  }

  // Otherwise, render the public marketing components
  return (
    <main>
      <div>
        <NavBar />
        <HeroSection />
      </div>
    </main>
  );
}
