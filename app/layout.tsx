import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/globals/Homepage/Header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FrostGreenPro",
  description: "FrostGreenPro is a professional snow plowing and landscaping company that provides services to the community.",
  keywords: ["snow plowing", "landscaping", "professional services", "community services"],
  authors: [{ name: "Neeraj", url: "https://codewithnik.vercel.app" }],
  creator: "Neeraj",
  publisher: "Neeraj",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
        <Toaster position="top-center"  />
        {children}
      </body>
    </html>
  );
}
