import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Moveo Joker Challange",
  description: "An IA Chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script src="https://cdn.jsdelivr.net/npm/@moveo-ai/web-client@latest/dist/web-client.min.js"/>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
