"use client"
import { useQuery } from "@tanstack/react-query"
import React from "react"
import { env } from "../../env.mjs"

const fetchStreamData = async ({ signal }: { signal?: AbortSignal }) => {
  const url = env.NEXT_PUBLIC_MOCK_STREAM_CHUNK_URL
  const response = await fetch(url, { signal })

  if (!response.ok || !response.body) {
    throw new Error(response.statusText)
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()

  let data = ""

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    data += decoder.decode(value, { stream: true })
  }

  return data
}
export function Chunk() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["chunk"],
    queryFn: ({ signal }) => fetchStreamData({ signal }),
    refetchOnWindowFocus: false, // Prevent refetching on window focus if not needed
    retry: false, // Disable retries, or customize
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  return <>{data}</>
}
