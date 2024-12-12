import { fetchIssues } from "@/api/issue";
import { fetchStatistics } from "@/api/user";
import '../../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from "react-i18next"; // Impor hook useTranslation
import { ShortcutButton } from "@/components/ShortcutButton";
import { ListIssue } from "@/components/issue/ListIssue";
import { Statistics } from "@/components/user/Statistics";
import { CustomButtonColors } from "@/constants/Colors";
import { Issue } from "@/types/issue";
import { type UserStatistics } from "@/types/user";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useState } from "react";
import { H4, ScrollView, Spinner, Text, View, XStack } from "tamagui";
import { RefreshControl } from 'react-native'; // Import RefreshControl dari react-native
import { useStorage } from '@/hooks/useStorage';
import { LogBox } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  LogBox.ignoreLogs([
    'Warning: Text strings must be rendered within a <Text> component.',
  ]);
  const [stats, setStats] = useState<UserStatistics>({
    success: 0,
    pending: 0,
    failed: 0,
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // Tambahkan state untuk RefreshControl
  const [error, setError] = useState<string | null>(null);
  const { get } = useStorage();
  const { t } = useTranslation(); 
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [key, setKey] = useState(0); // Add a key to force re-render

  const handleToken = async () => {
    const token = await get('auth_access_token'); 
    if (token) {
      setAccessToken(token); 
    }
  };

  const fetchData = async () => {
    try {
      setRefreshing(true); // Mulai refresh
      console.log("Fetching data..."); // Debug log
      const stats = await fetchStatistics();
      setStats(stats);
      const issues = await fetchIssues({ limit: 5 });
      setIssues(issues);
      console.log("Fetched data successfully"); // Debug log
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.log("Error fetching data: ", errorMessage); // Debug log
    } finally {
      setLoading(false);
      setRefreshing(false); // Selesai refresh
      console.log("Finished fetching data"); // Debug log
         // Increment key to force re-render of child components
      setKey(prevKey => prevKey + 1);
    }
  };

  useEffect(() => {
    const makeSurePortrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
  
    makeSurePortrait();
    handleToken();
    fetchData(); // Initial fetch when component mounts
  }, []); // Empty dependency array for initial fetch

  if (loading) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text color="red">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
    key={key} 
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={async () => {
            console.log("Refresh triggered"); // Debug log
            await fetchData(); // Fetch data when pull-to-refresh is triggered

            // Wait for state update and then push to /home
            setTimeout(() => {
              router.push("/home"); // Navigate to /home after refresh
            }, 500); // Add a delay to ensure the data is updated before navigation
          }} 
        />
      }
    >
      <View px="$3.5" py="$2.5" gap="$3.5">
        <Statistics
          success={stats.success}
          pending={stats.pending}
          failed={stats.failed}
        />
        <H4>{t('shortcut')}</H4>
        <XStack gap="$2">
          <ShortcutButton
            text={t('keys')}
            image={require("@/assets/images/banner/key.png")}
            bgColor={CustomButtonColors.key}
            onPress={() => router.push("/keys")}
          />
          <ShortcutButton
            text={t('scan')}
            image={require("@/assets/images/banner/scan.png")}
            bgColor={CustomButtonColors.scan}
            onPress={() => router.push("/scan")}
          />
          <ShortcutButton
            text={t('history')}
            image={require("@/assets/images/banner/history.png")}
            bgColor={CustomButtonColors.history}
            onPress={() => router.push("/history")}
          />
        </XStack>

        {/* Hanya tampilkan Recent Issues jika pengguna sudah login */}
        {accessToken && (
          <>
            <H4>{t('recentIssue')}</H4>
            <ListIssue
              data={issues}
              estimatedItemSize={5}
              accessTokens={accessToken}
              history={false}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
