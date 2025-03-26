"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // For navigation

  const handleReset = (e) => {
    e.preventDefault();
    
    // Simulate sending reset email (Replace with actual API call)
    setMessage("If this email is registered, a reset link has been sent.");
    
    console.log("Password reset link sent to:", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Forgot Password?</h2>

        {message && <p className="text-green-600 text-center mb-4">{message}</p>}

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Remembered your password?{" "}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">
            Back to Login
          </Link>
        </p>

        {/* Go to Home Button */}
        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full bg-gray-500 text-white py-3 rounded-md text-lg font-semibold hover:bg-gray-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}