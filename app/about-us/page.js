"use client";
import Link from "next/link";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-blue-600  p-4 text-white flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Health Mate</h1>
        <div>
          <Link href="/" className="px-4 py-2 hover:bg-blue-700 rounded-md">
            Home
          </Link>
          <Link href="/about" className="px-4 py-2 bg-white text-blue-600 rounded-md mx-2">
            About Us
          </Link>

        </div>
      </nav>

      {/* About Us Content */}
      <div className="flex-1 flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-100 to-blue-100 px-6 py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Health Mate</h2>
        <p className="text-gray-600 max-w-2xl text-lg">
Empowering Families with Smart Health Management

At Health Mate, we believe that managing your family’s health should be simple, organized, and stress-free. Our platform is designed to help families keep track of medical records, monitor health reports, and never miss a medication. Whether you’re caring for yourself, your children, or elderly family members, Health Mate makes it easier to stay on top of your family’s well-being.
        </p>

        <div className="mt-8 flex space-x-4">
          <Link href="/signup">
            <button className="bg-blue-600  text-white px-6 py-3 rounded-md text-lg hover:bg-blue-700  transition-all">
              Get Started
            </button>
          </Link>
          <Link href="/">
            <button className="bg-gray-300 text-blue-600 px-6 py-3 rounded-md text-lg hover:bg-gray-400 transition-all">
              Back to Home
            </button>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-600  text-white text-center py-4">
        <p>© 2025 Health Mate. All rights reserved.</p>
      </footer>
    </div>
  );
}