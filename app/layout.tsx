import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Health Mate',
  description: 'Health Mate is a health and fitness app that helps you track your workouts, meals, and more.',
};

export default function RootLayout({

  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>

       
          {children}
      </body>
    </html>
    </ClerkProvider>
  );
}