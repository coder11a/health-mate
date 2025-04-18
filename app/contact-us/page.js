// pages/contact.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const ContactPage= () => {
  const faqs = [
    {
      question: 'How secure is my health data on Health Mate?',
      answer: 'We implement bank-level encryption and follow HIPAA guidelines to ensure your health data remains secure and private. Your data is encrypted both in transit and at rest.'
    },
    {
      question: 'Can I create profiles for my entire family?',
      answer: 'Yes! Health Mate allows you to create and manage separate profiles for all family members, making it easy to keep track of everyone\'s health information in one place.'
    },
    {
      question: 'Is Health Mate available on mobile devices?',
      answer: 'Health Mate is available as both a web application and mobile app for iOS and Android, allowing you to access your health information anytime, anywhere.'
    },
    {
      question: 'How do I upload medical reports?',
      answer: 'You can easily upload medical reports by navigating to your profile page, selecting "Upload Documents," and choosing the files from your device. We support most common file formats.'
    }
  ];

  return (
    <>
      <Head>
        <title>Contact Us | Health Mate</title>
        <meta name="description" content="Get in touch with the Health Mate team. We're here to help with all your health management needs." />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" legacyBehavior>
              <a className="flex items-center">
                <span className="text-blue-600 text-2xl font-bold">Health Mate</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="max-w-2xl mx-auto text-xl text-blue-100">
              Have questions or need assistance? Our team is here to help you make the most of Health Mate.
            </p>
          </div>
        </div>

        {/* Contact Info Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h2>
              
              <div className="grid md:grid-cols-3 gap-8 text-center">
                {/* Email */}
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                 
                  <p className="text-gray-600 mb-2">Support:</p>
                  <p className="text-blue-600 font-medium">healthmate@gmail.com</p>
                </div>
                
                {/* Phone */}
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                  <p className="text-blue-600 font-medium mb-3">(555) 123-4567</p>
                  <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                </div>
                
                {/* Address */}
                <div className="p-6 bg-blue-50 rounded-lg">
                  <div className="h-16 w-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
                  <address className="not-italic text-gray-600">
                    <p>Health Mate Headquarters</p>
                    <p>123 Health Street</p>
                    <p>India</p>
                  </address>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* Connect Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
           
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 mb-4">Can't find an answer to your question?</p>
            <a href="mailto:healthmate@gmail.com" className="inline-flex items-center font-medium text-blue-600 hover:text-blue-800">
              Email our support team
              <svg className="ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>
        </div>
      </main>

      {/* Footer - Using your provided code */}
      <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Health Mate. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link href="/privacy-policy" legacyBehavior>
              <a className="text-white hover:text-gray-300 transition duration-300">
                Privacy Policy
              </a>
            </Link>
            <Link href="/terms-conditions" legacyBehavior>
              <a className="text-white hover:text-gray-300 transition duration-300">
                Terms of Service
              </a>
            </Link>
            <Link href="/contact-us" legacyBehavior>
              <a className="text-white hover:text-gray-300 transition duration-300">
                Contact Us
              </a>
            </Link>
            <Link href="/about-us" legacyBehavior>
              <a className="text-white hover:text-gray-300 transition duration-300">
                About Us
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ContactPage;