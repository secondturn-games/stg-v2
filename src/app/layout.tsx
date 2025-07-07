import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Second Turn – Baltic Board Game Marketplace",
  description: "Launching soon in Estonia, Latvia, and Lithuania. Sign up to get notified when Second Turn, the board game marketplace for the Baltics, goes live!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#DBE5B9] text-[#29432B] dark:bg-[#222b1f] dark:text-[#DBE5B9]">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6C8C64" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512x512.png" />
        {/* Example nav logo usage: <link rel="preload" as="image" href="/nav-logo.svg" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#DBE5B9] text-[#29432B] dark:bg-[#222b1f] dark:text-[#DBE5B9]`}
      >
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
