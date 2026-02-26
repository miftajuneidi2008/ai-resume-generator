import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    UPLOADTHING_TOKEN: z.string().min(1),
    STRIPE_SECRET_KEY: z.string().min(1),
    GOOGLE_API_KEY: z.string().min(1),
    GROQ_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1), 
  },
  client: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_PRICE_ID_PRO_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_PRICE_ID_PRO_PLUS_MONTHLY: z.string().min(1),
    NEXT_PUBLIC_NEXTURL: z.string().min(1).url(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_PRICE_ID_PRO_MONTHLY:
      process.env.NEXT_PUBLIC_PRICE_ID_PRO_MONTHLY,
    NEXT_PUBLIC_PRICE_ID_PRO_PLUS_MONTHLY:
      process.env.NEXT_PUBLIC_PRICE_ID_PRO_PLUS_MONTHLY,
    NEXT_PUBLIC_NEXTURL: process.env.NEXT_PUBLIC_NEXTURL,
  },
});
