import { fetchUserInfo, getAccessToken } from "@/api/auth";
import { App } from "@/constants/App";
import { Url } from "@/constants/Url";
import { env } from "@/lib/env";
import * as AuthSession from "expo-auth-session";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";
import { create } from "zustand";
import { useStorage } from "./useStorage";


interface AuthState {
  user: Record<string, any> | null;
  access_token: string | null;
  isLoading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  me: () => Promise<void>;
  authenticate: (token?: string) => Promise<void>;
  getToken: () => Promise<string | null>;
}

const TOKEN_STORAGE_KEY = "auth_access_token";
const AUTH_SCOPE = "openid email profile goauthentik.io/api";

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  access_token: null,
  isLoading: false,
  error: null,
  signIn: async () => {
    try {
      set({ isLoading: true });

      const redirectUri = AuthSession.makeRedirectUri({
        scheme: App.scheme,
        path: "(tabs)/home",
      });

      const params = new URLSearchParams({
        client_id: env.clientId,
        response_type: "code",
        redirect_uri: redirectUri,
        scope: AUTH_SCOPE,
        state: Math.random().toString(36).substring(7),
      });
    

      const authUrl = `${Url.auth.authorize}?${params}`;
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri
      );

      if (result.type === "success" && result.url) {
        await handleAuth(result.url);
      } else {
        throw new Error("Authentication cancelled or failed");
      }
    } catch (error) {
      // handleError(error instanceof Error ? error.message : "Sign-in failed");
    }
  },
  
  me: async () => {
    const { get } = useStorage();
    const storedToken = await get(TOKEN_STORAGE_KEY);
    console.log("Parsed token", storedToken);
    if (storedToken) {
      console.log("Token found in storage");
      set({ access_token: storedToken });
      try {
        const user = await fetchUserInfo(storedToken);
        useAuthStore.setState({ user, isLoading: false, error: null });
      } catch (error) {
        // handleError(
        //   error instanceof Error ? error.message : "Fetch user info failed"
        // );
      }
    }
  },

  signOut: async () => {
    try {
      const { remove } = useStorage(); // Access remove function from useStorage
      await remove(TOKEN_STORAGE_KEY); // Remove token from storage
      set({ user: null, access_token: null }); // Reset state
      console.log("Successfully signed out and token removed.");
    } catch (error) {
      // console.error("Error signing out:", error);
    }
  },
  authenticate: async (token?: string) => {
    const accessToken = token || get().access_token;
    if (!accessToken) {
      handleError("No access token provided");
    } else {
      try {
        const user = await fetchUserInfo(accessToken);
        useAuthStore.setState({ user, isLoading: false, error: null });
      } catch (error) {
        // handleError(
        //   error instanceof Error ? error.message : "Fetch user info failed"
        // );
      }
    }
  },
  getToken: async () => get().access_token,
}));

const handleError = (message: string) => {
  // console.error("[Auth Error]:", message);
  useAuthStore.setState({ error: message, isLoading: false });
};

const handleAuth = async (url: string) => {
  const { set } = useStorage();
  try {
    const params = new URLSearchParams(
      new URL(url).search || new URL(url).hash.slice(1)
    );
    const code = params.get("code");
    if (!code) throw new Error("No authentication code received");

    const token = await getAccessToken(code);
    if (!token?.access_token) throw new Error("No access token received");

    await set(TOKEN_STORAGE_KEY, token?.access_token);
    try {
      const user = await fetchUserInfo(token.access_token);
      useAuthStore.setState({ user, isLoading: false, error: null });
    } catch (error) {
      // handleError(
      //   error instanceof Error ? error.message : "Fetch user info failed"
      // );
    }
  } catch (error) {
    // handleError(
    //   error instanceof Error ? error.message : "Authentication failed"
    // );
  }
};

export function useSession() {
  const { user, isLoading, error, signIn, me, getToken, authenticate, signOut } =
    useAuthStore();

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => handleAuth(url);
    const subscription = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    me();
  }, []);

  return {
    session: user,
    isLoading,
    error,
    signIn,
    signOut,
    me,
    authenticate,
    getToken,
    token: getToken(),
  };
}
