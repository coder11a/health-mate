// pages/terms-conditions.tsx
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const TermsConditionsPage= () => {
  // You can update the last updated date as needed
  const lastUpdated = 'April 16, 2025';

  return (
    <>
      <Head>
        <title>Terms and Conditions | Health Mate</title>
        <meta name="description" content="Health Mate's terms and conditions - please read carefully before using our services" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/" legacyBehavior>
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
              <h1 className="text-3xl font-bold text-gray-900">Terms and Conditions</h1>
              <p className="mt-2 text-sm text-gray-600">Last Updated: {lastUpdated}</p>
            </div>

            {/* Terms Content */}
            <div className="px-6 py-8 text-black ">
                {/* Introduction Section */}
                Effective Date: April 16 2025

Welcome to HealthMate. By using our website https://health-mate-nu.vercel.app, you agree to these Terms of Service. Please read them carefully before using our services. If you do not agree to these terms, please do not use our website.

 1.⁠ ⁠Use of Website
HealthMate provides general health and wellness information for educational purposes only. You agree to use this site lawfully and responsibly. You must not:

Use the website in any way that may harm, disable, or impair it

Attempt unauthorized access to any portion of the website

Use automated tools (bots, scrapers, etc.) to access data

 2.⁠ ⁠Not Medical Advice
HealthMate does not provide medical advice.
All content, including text, graphics, and recommendations, is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek advice from a licensed healthcare provider with any questions about a medical condition.

 3.⁠ ⁠User Accounts (If Applicable)
If you create an account with us:

You are responsible for maintaining the confidentiality of your login credentials

You agree to provide accurate, current, and complete information

We reserve the right to terminate accounts that violate these terms

 4.⁠ ⁠Intellectual Property
All content on HealthMate, including text, graphics, logos, and branding, is the property of HealthMate and is protected by copyright and trademark laws. You may not copy, reproduce, or use our content without prior written permission.

 5.⁠ ⁠Third-Party Links
HealthMate may contain links to third-party websites. These are provided for your convenience, but we do not endorse or take responsibility for the content or policies of these external sites.

 6.⁠ ⁠Limitation of Liability
To the fullest extent permitted by law, HealthMate and its team are not liable for any damages arising from:

Your use of or inability to use the site

Errors or omissions in content

Any reliance placed on health suggestions or data presented

 7.⁠ ⁠Termination
We reserve the right to suspend or terminate access to the website or any part of it at any time, with or without notice, for any reason, including violation of these Terms.

 8.⁠ ⁠Changes to Terms
We may revise these Terms of Service at any time. The updated version will be posted on this page with a new "Effective Date." Continued use of the site means you accept any changes.

 9.⁠ ⁠Governing Law
These Terms are governed by and construed in accordance with the laws of [Your Country/State], without regard to conflict of law principles.

10.⁠ ⁠Contact Us
If you have any questions about these Terms, please contact us at:
📧 [healthmate22@gmail.com]
       
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
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

export default TermsConditionsPage;