import React from "react";
import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import { Roboto } from "next/font/google";
import Providers from "./providers";

import "./globals.css";

const roboto = Roboto({ weight: ["400"], subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "E-Bazaar App",
  description:
    "This is the E-Bazaar App by Arshad to add products in database and add, delete, update products in cart. E-bazaar is designed to enhance the overall e-commerce experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* Toaster to show user toast of adding,updating, deleting products to cart */}
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
