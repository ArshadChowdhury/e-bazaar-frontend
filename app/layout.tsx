import React from "react";
import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import Providers from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Bazaar App",
  description: "This is the E-Bazaar App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
