// pages/privacy-policy.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  // You can update the last updated date as needed
  const lastUpdated = 'April 16, 2025';

  return (
    <>
      <Head>
        <title>Privacy Policy | Health Mate</title>
        <meta name="description" content="Health Mate's privacy policy - how we protect your data and respect your privacy" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link legacyBehavior href="/">
              <a className="flex items-center">
                <span className="text-blue-600 text-2xl font-bold">Health Mate</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Title Section */}
            <div className="px-6 py-8 border-b border-gray-200 bg-gray-50">
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="mt-2 text-sm text-gray-600">Last Updated: {lastUpdated}</p>
            </div>

            {/* Policy Content */}
            <div className="px-6 py-8 text-black" >
              Privacy Policy
              Effective Date: April 17 2025

              HealthMate ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you use our website: https://health-mate-nu.vercel.app.

              1.⁠ ⁠Information We Collect
              We may collect the following types of information:

              Personal Information: Name, email address, age, gender, and any health inputs you choose to share.

              Usage Data: Pages visited, time spent on the site, browser and device type, IP address.

              2.⁠ ⁠How We Use Your Information
              We use your information to:

              Provide, personalize, and improve our services

              Respond to your inquiries and requests

              Send updates, newsletters, or promotional content (only if you opt-in)

              Analyze trends and improve user experience

              Ensure security and compliance with legal obligations

              3.⁠ ⁠Sharing Your Information
              We do not sell, trade, or rent your personal information. We may share your information with:

              Trusted service providers who help operate the site

              Legal authorities when required by law or to protect our rights

              4.⁠ ⁠Cookies and Tracking Technologies
              We use cookies and similar technologies to:

              Enhance your browsing experience

              Track how you use the website

              Analyze performance and usage patterns

              You can manage your cookie preferences in your browser settings.

              5.⁠ ⁠Third-Party Links
              Our website may contain links to third-party websites. We are not responsible for the content or privacy practices of those sites. Please review their privacy policies before sharing your information.

              6.⁠ ⁠Data Security
              We implement appropriate technical and organizational measures to protect your information. However, please note that no method of online transmission is completely secure.

              7.⁠ ⁠Children's Privacy
              HealthMate is not intended for individuals under the age of 13. We do not knowingly collect personal information from children.

              8.⁠ ⁠Your Rights
              Depending on your location, you may have rights to:

              Access the personal data we hold about you

              Request correction or deletion of your data

              Withdraw consent or object to processing

              To exercise any of these rights, contact us at [healthmate22@gmail.com].

              9.⁠ ⁠Changes to This Policy
              We may update this Privacy Policy from time to time. Any changes will be posted here with a revised "Effective Date" above.

              10.⁠ ⁠Contact Us
              If you have any questions or concerns about this Privacy Policy, please contact us at:

              📧 [healthmate22@gmail.com]

            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-lg">&copy; {new Date().getFullYear()} Health Mate. All rights reserved.</p>
          <div className="mt-4 space-x-6">
            <Link legacyBehavior href="/privacy-policy" className="text-white hover:text-gray-300 transition duration-300">
              Privacy Policy
            </Link>
            <Link legacyBehavior href="/terms-conditions" className="text-white hover:text-gray-300 transition duration-300">
              Terms of Service
            </Link>
            <Link legacyBehavior href="/contact-us" className="text-white hover:text-gray-300 transition duration-300">
              Contact Us
            </Link>
            <Link legacyBehavior href="about-us" className="text-white hover:text-gray-300 transition duration-300">
              About Us
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default PrivacyPolicyPage;