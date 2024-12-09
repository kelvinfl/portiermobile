import { env } from "@/lib/env";

export const Url = {
  auth: {
    base: `${env.authUrl}/application/o`,
    token: `${env.authUrl}/application/o/token/`,
    userInfo: `${env.authUrl}/application/o/userinfo/`,
    authorize: `${env.authUrl}/application/o/authorize/`,
  },
  api: {},
};
