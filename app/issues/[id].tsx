import { getIssueById } from '@/api/issue';
import { Chip } from '@/components/Chip';
import { IssueIcon } from '@/components/issue/IssueIcon';
import { Colors } from '@/constants/Colors';
import { capitalizeFirstLetter } from '@/lib/utils';
import { Issue } from '@/types/issue';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Location } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Card, Image, Spinner, Text, View } from 'tamagui';

export default function DetailIssue2() {
  const { id } = useLocalSearchParams();
  const [issue, setIssue] = useState<Issue | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchIssue = async () => {
      if (typeof id === 'string') {
        const issue = await getIssueById(parseInt(id));
        setIssue(issue);
      }
    };

    fetchIssue();
  }, [id]);

  useEffect(() => {
    if (issue) {
      let status = 'Transfer key';
      if (issue.type === 'receive') {
        status = 'Receive key';
      }
      navigation.setOptions({ headerTitle: status });
    }
  }, [issue, navigation]);

  if (!issue) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <View px="$3.5" py="$2.5" gap="$3.5">
      <Card padded bordered fd="row" ai="center" gap="$2">
        <IssueIcon type={issue.type} status={issue.status} />
        <View>
          <Text fontSize={12} fontWeight={400}>
            {issue?.name}
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {issue?.description}
          </Text>
        </View>
      </Card>
      <Card padded bordered gap="$2">
        <View fd="row" ai="center" gap="$2">
          <Location color={Colors.danger} />
          <View>
            <Text fontSize={12} fontWeight={400}>
              {issue?.location?.name}
            </Text>
            <Text fontSize={12} fontWeight={400}>
              {issue?.location?.address}
            </Text>
          </View>
        </View>
        {/* TODO: add flag via firebase remote config */}
        {/* {(Platform.OS === "ios" || Platform.OS === "android") && (
          <MapView
            initialRegion={{
              latitude: issue?.location?.latitude || 0,
              longitude: issue?.location?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )} */}
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
            {issue.roomKey}
          </Text>
        </View>
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
            Created At:
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {new Date(issue.createdAt || new Date()).toLocaleString()}
          </Text>
        </View>
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
            Signature:
          </Text>
          <Image source={{ uri: issue?.signatureImage }} style={{ width: 100, height: 100 }} />
        </View>
      </Card>
    </View>
  );
}
