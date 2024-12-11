'use client';

//import React, { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function NavBar() {
  //const [showDropdown, setShowDropdown] = useState(false);

  // const handleLogout = async () => {
  //   try {
  //     const response = await fetch('/api/auth/logout', { method: 'GET' });
  //     if (response.ok) {
  //       localStorage.clear();
  //       sessionStorage.clear();
  //       window.location.reload();
  //     } else {
  //       console.error('Logout failed:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // };

  return (
    <nav
      className="bg-gradient-to-r from-gray-800 via-blue-900 to-gray-800 text-white shadow-lg fixed top-0 left-0 right-0 z-50"
      style={{ height: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-full">
        {/* Logo Section */}
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-md"
            src="./logo.png"
            alt="Logo"
          />
          <h1 className="text-xl font-bold ml-3 hidden sm:block tracking-wide">
            LytportAI
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/">
            <span className="hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Dashboard
            </span>
          </Link>
          <Link href="../insights">
            <span className="hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Insights
            </span>
          </Link>
          <Link href="../chatWithData">
            <span className="hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Chat With Data
            </span>
          </Link>
          <Link href="../report">
            <span className="hover:text-blue-400 transition-all duration-200 font-medium cursor-pointer">
              Report
            </span>
          </Link>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-6">
          {/* Notifications Button */}
          <button className="text-gray-300 hover:text-blue-400 transition-all duration-200">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V8a6 6 0 10-12 0v6a2.032 2.032 0 01-.595 1.595L4 17h5m1 0v1a3 3 0 006 0v-1m-6 0h6"
              ></path>
            </svg>
          </button>

          {/* User Dropdown Menu */}
          {/* <div className="relative">
            <button
              className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                className="h-8 w-8 rounded-full border-2 border-gray-700"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User avatar"
              />
              <span className="ml-2 hidden sm:block">Moudjahid Moussa</span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-md z-10">
                <a
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Settings
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div> */}
          <div className='relative'>
          <UserButton appearance ={
            {
              elements:{
                userButtonOuterIdentifier:'text-white'
              }
            }
          }
            showName={true} />
          </div>
          {/* Logout Button */}
          {/* <button
            onClick={handleLogout}
            className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            aria-label="Logout"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m-5.25-3h9m0 0l-3-3m3 3l-3 3"
              />
            </svg>
          </button> */}
        </div>
      </div>
    </nav>
  );
}