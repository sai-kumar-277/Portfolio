import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NightSky from "@/components/NightSky";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sai Kumar - AI Systems Engineer",
  description: "High-end product experience portfolio of Sai Kumar, AI Systems & Data-Driven Software Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased selection:bg-primary-glow font-sans`}>
        <NightSky />
        {children}
      </body>
    </html>
  );
}
