"use client";

import type { Metadata } from "next";
import { useState } from "react";

import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

import "./globals.css";

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// export default function MyApp({ Component, pageProps }) {

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Hydrate state={pageProps.dehydratedState}>
//         <Component {...pageProps} />
//       </Hydrate>
//     </QueryClientProvider>
//   );
// }

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
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
