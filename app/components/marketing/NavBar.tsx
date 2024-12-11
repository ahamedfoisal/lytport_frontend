'use client'

import React from 'react'
import Link from 'next/link'

const NavBar: React.FC = () => {
  return (
    <div className="w-full shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-8 lg:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 w-6 h-6 rounded-md"></div>
          <span className="text-xl font-bold text-gray-800">
            Lytport<span className="text-gray-500">AI</span>
          </span>
        </div>

        {/* Navigation Links */}
        {/* <div className="hidden lg:flex space-x-8 text-gray-700">
          <Link href="#features" className="hover:text-gray-900 transition">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-gray-900 transition">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-gray-900 transition">
            FAQ
          </Link>
          
        </div> */}

        {/* Sign Up and Theme Toggle */}
        <div className="flex items-center space-x-8">
        <Link href="#features" className="hover:text-gray-900 transition">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-gray-900 transition">
            Pricing
          </Link>
          <Link href="#faq" className="hover:text-gray-900 transition">
            FAQ
          </Link>
        <Link href="/sign-in" className="hover:text-gray-900 transition">
            Login
          </Link>
          <Link
            href="/sign-up"
            className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-purple-700 transition"
          >
            Sign Up
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default NavBar