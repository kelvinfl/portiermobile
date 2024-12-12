import { Chip } from '@/components/Chip';
import { IssueIcon } from '@/components/issue/IssueIcon';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Card, Image, Spinner, Text, View } from 'tamagui';

type IssueResponse = {
  data: {
    created_at: string;
    holder_id: string;
    holder_name: string;
    issue: {
      copy: number;
      description: string;
      number: string;
    }[];
    location_latitude: number;
    location_longitude: number;
    notes: string;
    request_id: string;
    request_user: string;
    sign: string;
    signed_at: string;
    status: string;
    updated_at: string;
  };
  message: string;
  status: string;
};

export default function DetailIssue() {
  const { id } = useLocalSearchParams();
  const [issue, setIssue] = useState<IssueResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const token = params?.token as string | undefined;
  const X_PORTIER_AGENT = 'portier/Vision (Windows 11; v5.0.1)';

  useEffect(() => {
    const fetchIssue = async () => {
      if (typeof token === 'string') {
        try {
          const response = await fetch(
            `https://kotg-server-531186732263.asia-southeast2.run.app/api/v1/key-otg/sign/${token}?token=${token}`,
            {
              headers: {
                'X-Portier-Agent': X_PORTIER_AGENT,
              },
            },
          );
          const result = await response.json();
          if (result.status === 'success' && result.data) {
            setIssue(result.data);
            let status = 'Transfer key';
            if (result.data.issue[0]?.description === 'receive') {
              status = 'Receive key';
            }
            navigation.setOptions({ headerTitle: status });
          }
        } catch (error) {
          console.log('err', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchIssue();
  }, [id, navigation, token]);

  if (loading) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" />
      </View>
    );
  }

  if (!issue) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Text>No issue data available</Text>
      </View>
    );
  }

  return (
    <View px="$3.5" py="$2.5" gap="$3.5">
      <Card padded bordered fd="row" ai="center" gap="$2">
        <IssueIcon type={issue.issue[0]?.description} status={issue.status} />
        <View>
          <Text fontSize={12} fontWeight={400}>
            {issue.holder_name}
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {issue.notes}
          </Text>
        </View>
      </Card>

      <Card padded bordered gap="$2">
        <MapView
          style={{ width: '100%', height: 200 }}
          region={{
            latitude: issue.location_latitude,
            longitude: issue.location_longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: issue.location_latitude,
              longitude: issue.location_longitude,
            }}
            title="Issue Location"
            description={`Latitude: ${issue.location_latitude}, Longitude: ${issue.location_longitude}`}
          />
        </MapView>
      </Card>

      <Card padded bordered gap="$2">
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
            Status:
          </Text>
          <Chip px="$2" py="$1" status={issue.status} text={capitalizeFirstLetter(issue.status)} />
        </View>
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
            Key:
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {issue.issue[0]?.number}
          </Text>
        </View>
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
            Created At:
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {new Date(issue.created_at).toLocaleString()}
          </Text>
        </View>
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
            Signature:
          </Text>
          {issue.sign && (
            <Image
              source={{ uri: `data:image/png;base64,${issue.sign}` }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      </Card>
    </View>
  );
}
