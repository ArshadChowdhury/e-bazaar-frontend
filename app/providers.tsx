"use client";

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  // Created providers which will provide the cached data to all the childrens wrapped by them
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
