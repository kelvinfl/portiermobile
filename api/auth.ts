import { App } from "@/constants/App";
import { Url } from "@/constants/Url";
import { env } from "@/lib/env";
import * as AuthSession from "expo-auth-session";
import { apiRequest } from ".";

export const fetchUserInfo = async (accessToken: string) => {
  try {
    const user = await apiRequest(
      Url.auth.userInfo,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      },
      "Failed to fetch user info"
    );
    return user;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Fetch user info failed"
    );
  }
};

export const getAccessToken = async (code: string) => {
  try {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: App.scheme,
      path: "(tabs)/home",
    });

    const credentials = btoa(`${env.clientId}:${env.clientSecret}`);
    const formData = new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    });


    const response = await apiRequest(
      Url.auth.token,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: formData.toString(),
      },
      "Token exchange failed"
    );

    return response;
  } catch (error) {
    // Log error jika terjadi kegagalan
    console.error("Token exchange failed:", error);
    throw error; // Jika perlu, lempar error agar bisa ditangani di tempat lain
  }
};
