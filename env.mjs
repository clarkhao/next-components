import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    ANALYZE: z
      .enum(["true", "false"])
      .optional()
      .transform((value) => value === "true"),
  },
  client: {
    NEXT_PUBLIC_MOCK_STREAM_CHUNK_URL: z.string().startsWith("http"),
  },
  runtimeEnv: {
    ANALYZE: process.env.ANALYZE,
    NEXT_PUBLIC_MOCK_STREAM_CHUNK_URL: process.env.NEXT_PUBLIC_MOCK_STREAM_CHUNK_URL,
  },
})
