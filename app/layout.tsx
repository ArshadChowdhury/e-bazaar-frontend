import React from "react";
import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";
import Providers from "./providers";

import "./globals.css";

const roboto = Roboto({ weight: ["400"], subsets: ["cyrillic"] });

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
      <body className={roboto.className}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
