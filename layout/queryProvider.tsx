"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"

export const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const clientRef = React.useRef<QueryClient | null>(null)
  if (!clientRef.current) {
    clientRef.current = new QueryClient()
  }
  return <QueryClientProvider client={clientRef.current}>{children}</QueryClientProvider>
}
