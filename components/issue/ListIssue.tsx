import { Issue } from '@/types/issue';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Paragraph, XStack, YStack } from 'tamagui';
import { Chip } from '../Chip';
import { NavigableCard } from '../NavigableCard';
import { IssueIcon } from './IssueIcon';

// type Issue = {
//   issueId: string;
//   name: string;
//   description: string;
//   status: string;
//   type: string;
// };

type IssueItemProps = Issue & {
  buttonOnPress?: () => void;
};

function IssueItem({
  issueId,
  name,
  description,
  status,
  type,
  buttonOnPress,
  ...props
}: IssueItemProps) {
  return (
    <NavigableCard {...props} buttonOnPress={buttonOnPress}>
      <XStack f={1} ai="center" gap="$3">
        <IssueIcon status={status} type={type} />
        <YStack f={1} gap="$1">
          <XStack ai="center" fw="wrap" gap="$2">
            <Paragraph>{name}</Paragraph>
            <Chip px="$2" py="$1" status={status} text={status} />
          </XStack>
          <Paragraph size="$2" theme="alt2">
            {description}
          </Paragraph>
        </YStack>
      </XStack>
    </NavigableCard>
  );
}

type ListIssueProps = {
  accessTokens: string;
  history: boolean;
};

export function ListIssue({ accessTokens, history }: ListIssueProps) {
  const [data, setData] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!accessTokens) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://kotg-server-531186732263.asia-southeast2.run.app/api/v1/key-otg/auth/sign',
          {
            headers: {
              Authorization: `Bearer ${accessTokens}`,
            },
          },
        );
        const result = await response.json();

        if (response.ok && result.data) {
          const issues = result.data.map((item: any) => ({
            issueId: item.request_id,
            name: item.holder_name,
            description: item.notes,
            status: item.status || 'pending',
            type: item.type || 'unknown',
          }));

          if (history) {
            setData(issues);
          } else {
            const filteredIssues = issues.filter((issue) => issue.status === 'pending');
            setData(filteredIssues);
          }
        }
      } catch (error) {
        console.log('err', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accessTokens, history]);

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  return (
    <FlashList
      data={data}
      renderItem={({ item, index }) => (
        <IssueItem
          key={item.issueId}
          {...item}
          buttonOnPress={() => {
            if (item.status === 'pending') {
              router.push({
                pathname: '/issues/sign',
                params: {
                  token: item.issueId,
                },
              });
            } else {
              router.push({
                pathname: '/issues/detail',
                params: {
                  token: item.issueId,
                },
              });
            }
          }}
          mb={index === data.length - 1 ? null : '$3'}
        />
      )}
      estimatedItemSize={100}
    />
  );
}
