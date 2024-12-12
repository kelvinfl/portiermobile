import { fetchIssues } from '@/api/issue';
import { fetchStatistics } from '@/api/user';
import { ListIssue } from '@/components/issue/ListIssue';
import { useStorage } from '@/hooks/useStorage';
import { Issue } from '@/types/issue';
import { type UserStatistics } from '@/types/user';
import * as ScreenOrientation from 'expo-screen-orientation';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { H4, ScrollView, Spinner, Text, View } from 'tamagui';
import '../../i18n';

export default function HistoryScreen() {
  const [, setStats] = useState<UserStatistics>({
    success: 0,
    pending: 0,
    failed: 0,
  });
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { get } = useStorage();
  const { t } = useTranslation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const handleToken = async () => {
    const token = await get('auth_access_token');
    console.log(token);
    if (token) {
      setAccessToken(token);
    }
  };
  useEffect(() => {
    const makeSurePotrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
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
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
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
      <H4>{t('history')}</H4>
      <ListIssue data={issues} estimatedItemSize={5} accessTokens={accessToken} history={true} />
    </ScrollView>
  );
}
