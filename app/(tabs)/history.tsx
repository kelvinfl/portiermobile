import { fetchIssues } from "@/api/issue";
import { fetchStatistics } from "@/api/user";
import '../../i18n';
import { useTranslation } from "react-i18next";
import { ListIssue } from "@/components/issue/ListIssue";
import { ListIssueNon } from "@/components/issue/ListIssueNon";
import { Issue } from "@/types/issue";
import { type UserStatistics } from "@/types/user";
import { useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useState, useCallback } from "react";
import { H4, ScrollView, Spinner, Text, View } from "tamagui";
import { useStorage } from '@/hooks/useStorage';
import { RefreshControl } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const { remove, get, set } = useStorage();
  const { t, i18n } = useTranslation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [requestIds, setRequestIds] = useState<string[]>([]);
  const [key, setKey] = useState(0); // Add a key to force re-render

  // Existing methods remain the same
  const handleToken = async () => {
    const token = await get('auth_access_token');
    if (token) {
      setAccessToken(token);
    } else {
      setAccessToken(null);
    }
  };

  // Modified fetchData to improve refresh
  const fetchData = async () => {
    try {
      setRefreshing(true);
      setError(null);

      // Fetch data concurrently
      const [fetchedStats, fetchedIssues] = await Promise.all([
        fetchStatistics(),
        fetchIssues({ limit: 5 })
      ]);

      setStats(fetchedStats);
      setIssues(fetchedIssues);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Fetch error:", errorMessage);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setKey(prevKey => prevKey + 1);
    }
  };

  // Existing methods remain the same
  const removeAllRequestIds = async () => {
    try {
      await AsyncStorage.removeItem("requestIds");
      setRequestIds([]);
      alert("History telah dihapus");
      router.push('/home');
    } catch (error) {
      console.error("Error removing all requestIds", error);
      alert("Terjadi kesalahan saat menghapus history");
    }
  };

  const getRequestIds = async () => {
    try {
      const storedRequestIds = await AsyncStorage.getItem("requestIds");
      if (storedRequestIds) {
        setRequestIds(JSON.parse(storedRequestIds));
      } else {
        setRequestIds([]);
      }
    } catch (error) {
      console.error("Error fetching requestIds", error);
    }
  };

  // Existing useEffects remain the same
  useEffect(() => {
    const makeSurePortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    makeSurePortrait();
    handleToken();
    getRequestIds();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // Existing loading and error handling remain the same
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
          onRefresh={fetchData} 
          colors={['#9Bd35A', '#689F38']} // Optional: colors for Android
          tintColor="#689F38" // Optional: color for iOS
        />
      }
    >
      <H4>{t('history')}</H4>
      
      {accessToken ? (
        <ListIssue 
          data={issues} 
          estimatedItemSize={5} 
          accessTokens={accessToken} 
          history={true} 
        />
      ) : (
        <ListIssueNon 
          data={issues} 
          estimatedItemSize={5} 
          history={true} 
        />
      )}
    </ScrollView>
  );
}