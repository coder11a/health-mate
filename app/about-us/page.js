"use client";
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Abhishek Jain',
      role: 'Founder & Medical Director',
      bio: 'Board-certified physician with over 15 years of experience in family medicine.',
      image: '/user.png',
    },
    {
      name: 'Ansh Panwar',
      role: 'Chief Technology Officer',
      bio: 'Former health tech innovator with expertise in secure medical data systems.',
      image: '/user.png',
    },
    {
      name: 'Khushwant Mali',
      role: 'User Experience Lead',
      bio: 'Specialized in creating accessible healthcare interfaces for all ages.',
      image: '/user.png',
    },
    {
      name: 'Nishant Singh',
      role: 'User Experience Lead',
      bio: 'Specialized in creating accessible healthcare interfaces for all ages.',
      image: '/user.png',
    },
  ];

  const features = [
    {
      title: 'Family Profiles',
      description: 'Manage multiple family members with individual health profiles and histories.',
      icon: '👪',
    },
    {
      title: 'Medical Report Analysis',
      description: 'Upload and organize reports with smart analysis to track health metrics over time.',
      icon: '📊',
    },
    {
      title: 'Medicine Reminders',
      description: 'Never miss important medications with customizable alert systems.',
      icon: '⏰',
    },
  
  ];
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
    <>
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

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero Section */}
        <section className="pt-20 pb-16  px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mt-10">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl mb-6">
              About <span className="text-blue-600">Health Mate</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Your family's comprehensive health management platform designed with care and security in mind.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
    <div className="md:flex">
      <div className="md:w-1/2 relative h-64 md:h-auto mt-3 ml-3">
        <Image 
          src="/home.png" 
          alt="Family healthcare" 
          layout="fill"
          objectFit="fit" 
          className="rounded-l" // Optional: adds rounded corners

        />
      </div>
      <div className="md:w-1/2 p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-600 text-lg mb-6">
          Health Mate was founded with a simple yet powerful mission: to empower families to take control of their health information in a secure, intuitive way.
        </p>
        <p className="text-gray-600 text-lg">
          We believe that better health management leads to better health outcomes. By creating tools that make it easy to track, analyze, and act on health information, we're helping families make informed decisions and stay on top of their wellness journey.
        </p>
      </div>
    </div>
  </div>
</section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-52 w-52 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    layout="fill"
                    objectFit="cover" 
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 text-center">{member.name}</h3>
                {/* <p className="text-blue-600 mb-4 text-center">{member.role}</p> */}
                {/* <p className="text-gray-600 text-center">{member.bio}</p> */}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-blue-600 text-white rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to take control of your family's health?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of families who are already using Health Mate to manage their health information, set reminders, and make better health decisions.
            </p>
            <Link legacyBehavior href="/dashboard">
              <a className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                Get Started Today
              </a>
            </Link>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Health Mate. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link href="/privacy-policy" className="text-white hover:text-gray-300 transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="text-white hover:text-gray-300 transition duration-300">
              Terms of Service
            </Link>
            <Link href="/contact-us" className="text-white hover:text-gray-300 transition duration-300">
              Contact Us
            </Link>
            <Link href="about-us" className="text-white hover:text-gray-300 transition duration-300">
              About Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;