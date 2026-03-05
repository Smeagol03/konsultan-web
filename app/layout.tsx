import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollManager from "@/app/components/ScrollManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioBina — Konsultan Arsitektur & Perancang",
  description:
    "Mewujudkan visi arsitektural melalui pendekatan minimalisme Swiss dan teknologi material mutakhir. Layanan desain arsitektur, gambar kerja (DED), dan manajemen proyek.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}
