import { z } from "zod";

function validateEnv() {
  const EnvScheme = z.object({
    EXPO_PUBLIC_AUTH_URL: z.string().url(), 
    EXPO_PUBLIC_AUTH_CLIENT_ID: z.string().min(5),
    EXPO_PUBLIC_AUTH_CLIENT_SECRET: z.string().min(10),
  });

  const parsed = EnvScheme.parse(process.env);

  return {
    authUrl: parsed.EXPO_PUBLIC_AUTH_URL,
    clientId: parsed.EXPO_PUBLIC_AUTH_CLIENT_ID,
    clientSecret: parsed.EXPO_PUBLIC_AUTH_CLIENT_SECRET,
  };
}

export const env = validateEnv();
