"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-500 to-blue-800 p-5 shadow-md text-white fixed w-full z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-extrabold tracking-wide hover:text-blue-100 transition duration-300">
              Health Mate
            </h1>
          </Link>
          <div className="space-x-4">
            {!isSignedIn ? (
              <>
                <SignInButton mode="modal">
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-100 hover:text-blue-700 transition duration-300">
                    Login
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-100 hover:text-blue-700 transition duration-300">
                    Sign Up
                  </button>
                </SignUpButton>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-100 hover:text-blue-700 transition duration-300">
                    Dashboard
                  </button>
                </Link>
                <Link href="/about-us">
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-full shadow-md hover:bg-blue-100 hover:text-blue-700 transition duration-300">
                    About Us
                  </button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center flex-grow text-center px-4 py-32 bg-gradient-to-br from-blue-100 to-white text-black">
        <h2 className="text-5xl font-extrabold mb-6">
          Your Smart Family Health Companion
        </h2>
        <p className="text-lg mb-8 max-w-2xl text-gray-700 leading-relaxed">
          Create personalized family profiles, track medical reports, and get notified for your medications, all in one place. Your health, organized!
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg py-3 px-10 rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800"
        >
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Family Profiles</h3>
              <p className="text-gray-700">
                Create and manage personalized profiles for each family member, ensuring everyone's health is tracked efficiently.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Medicine Reminders</h3>
              <p className="text-gray-700">
                Never miss a dose with timely reminders for medications, keeping your family's health on track.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-bold text-blue-600 mb-4">Medical Reports</h3>
              <p className="text-gray-700">
                Easily upload, track, and manage medical reports, ensuring all health data is organized and accessible.
              </p>
            </div>
          </div>
        </div>
      </div>
<br />
<br />
      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Health Mate. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link href="#" className="text-white hover:text-gray-300 transition duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white hover:text-gray-300 transition duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-white hover:text-gray-300 transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}