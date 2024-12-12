import { fetchIssues } from "@/api/issue";
import { fetchStatistics } from "@/api/user";
import '../../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from "react-i18next"; // Impor hook useTranslation
import { ShortcutButton } from "@/components/ShortcutButton";
import { ListIssue } from "@/components/issue/ListIssue";
import { ListIssueNon } from "@/components/issue/ListIssueNon";
import { Statistics } from "@/components/user/Statistics";
import { CustomButtonColors } from "@/constants/Colors";
import { Issue } from "@/types/issue";
import { type UserStatistics } from "@/types/user";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useState } from "react";
import { H4, ScrollView, Spinner, Text, View, XStack, Button } from "tamagui";
import { useSession } from '@/hooks/useSession';
import { useStorage } from '@/hooks/useStorage';
import { RefreshControl } from 'react-native'; // Import RefreshControl from react-native
import AsyncStorage from "@react-native-async-storage/async-storage";  // Import AsyncStorage

export default function HistoryScreen() {
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
  const [refreshing, setRefreshing] = useState(false); // State for controlling refresh
  const [requestIds, setRequestIds] = useState<string[]>([]);  // State for request IDs

  const handleToken = async () => {
    const token = await get('auth_access_token'); // Mengambil token sekali
    if (token) {
      setAccessToken(token); // Menyimpan token ke dalam state jika ada
    } else {
      setAccessToken(null);
    }
  };

  const fetchData = async () => {
    try {
      setRefreshing(true); // Start the refresh process
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
      setRefreshing(false); // Stop the refresh process
    }
  };

  const removeAllRequestIds = async () => {
    try {
      await AsyncStorage.removeItem("requestIds");  // Menghapus semua requestIds dari AsyncStorage
      setRequestIds([]);  // Reset state requestIds
      alert("History telah dihapus");  // Menampilkan pemberitahuan setelah penghapusan
    } catch (error) {
      console.error("Error removing all requestIds", error);
      alert("Terjadi kesalahan saat menghapus history");
    }
  };

  useEffect(() => {
    const makeSurePortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    makeSurePortrait();
    handleToken();
  }, []);

  useEffect(() => {
    fetchData();
  }, []); // This fetches the initial data when the component mounts

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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchData} /> // Use RefreshControl for pull-to-refresh
      }
    >
      <H4>{t('history')}</H4> {/* Menggunakan key 'recentIssue' */}
      
      {/* Tombol hapus history hanya akan muncul jika user tidak login */}
      {accessToken === null && (
     <Button
     title="Hapus History"
     onPress={removeAllRequestIds}
     style={{
       backgroundColor: '#FF5733',  // Warna latar belakang tombol (oranye)
       paddingVertical: 12,          // Padding vertikal
       paddingHorizontal: 20,        // Padding horizontal
       borderRadius: 8,             // Border radius untuk sudut yang melengkung
       color: '#fff',               // Warna teks tombol
       fontWeight: 'bold',           // Font tebal untuk teks tombol
       alignSelf: 'center',         // Untuk menempatkan tombol di tengah
       marginTop: 20,
       marginBottom: 30,               // Jarak atas agar tidak terlalu dekat dengan elemen lain
     }}
   >
     Hapus History
   </Button>
      )}
      
      {
        accessToken ? (
          <ListIssue data={issues} estimatedItemSize={5} accessTokens={accessToken} history={true} />
        ) : (
          <ListIssueNon data={issues} estimatedItemSize={5} history={true} />
        )
      }
    </ScrollView>
  );
}
