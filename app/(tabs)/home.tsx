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
import { useSession } from '@/hooks/useSession';
import { useStorage } from '@/hooks/useStorage';

export default function HomeScreen() {
  const router = useRouter();

  const [stats, setStats] = useState<UserStatistics>({
    success: 0,
    pending: 0,
    failed: 0,
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { remove, get, set } = useStorage();  // Menggunakan remove dan get dari useStorage
  const { t, i18n } = useTranslation(); // Inisialisasi hook useTranslation
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const handleToken = async () => {
    console.log("terteken");
    const token = await get('auth_access_token'); // Mengambil token sekali
    console.log(token); // Pastikan token yang diambil sesuai
    if (token) {
      setAccessToken(token); // Menyimpan token ke dalam state jika ada
    }
  };
  useEffect(() => {
    const makeSurePotrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    makeSurePotrait();
    handleToken();
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await fetchStatistics();
        setStats(stats);
        const issues = await fetchIssues({ limit: 5 });
        setIssues(issues);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <ScrollView>
      <View px="$3.5" py="$2.5" gap="$3.5">
        <Statistics
          success={stats.success}
          pending={stats.pending}
          failed={stats.failed}
        />
        <H4>{t('shortcut')}</H4> {/* Menggunakan key 'shortcut' */}
        <XStack gap="$2">
          <ShortcutButton
            text={t('keys')} // Menggunakan key 'keys'
            image={require("@/assets/images/banner/key.png")}
            bgColor={CustomButtonColors.key}
            onPress={() => router.push("/keys")}
          />
          <ShortcutButton
            text={t('scan')} // Menggunakan key 'scan'
            image={require("@/assets/images/banner/scan.png")}
            bgColor={CustomButtonColors.scan}
            onPress={() => router.push("/scan")}
          />
          <ShortcutButton
            text={t('history')} // Menggunakan key 'history'
            image={require("@/assets/images/banner/history.png")}
            bgColor={CustomButtonColors.history}
            onPress={() => router.push("/history")}
          />
        </XStack>
        <H4>{t('recentIssue')}</H4> {/* Menggunakan key 'recentIssue' */}
        <ListIssue data={issues} estimatedItemSize={5} accessTokens={accessToken} history={false} />

      </View>
    </ScrollView>
  );
}