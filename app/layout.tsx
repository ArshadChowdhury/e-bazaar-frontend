import type { Metadata } from "next";

import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
