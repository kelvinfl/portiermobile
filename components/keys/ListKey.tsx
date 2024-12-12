import { Key } from '@/types/key';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import React from 'react';
import { Card, GetProps, Paragraph, XStack, YStack } from 'tamagui';
import { NavigableCard } from '../NavigableCard';

type FlashListProps = React.ComponentProps<typeof FlashList>;
type ListProps = {
  data: Key[];
  estimatedItemSize: number;
} & Omit<FlashListProps, 'data' | 'renderItem' | 'estimatedItemSize'>;

type CardProps = GetProps<typeof Card>;
type KeyItemProps = Key &
  Omit<CardProps, keyof Key> & {
    buttonOnPress?: () => void;
  };

function KeyItem({ holder_name, notes, buttonOnPress, ...props }: KeyItemProps) {
  return (
    <NavigableCard {...props} buttonOnPress={buttonOnPress}>
      <XStack f={1} ai="center" gap="$3">
        <YStack f={1} gap="$1">
          <XStack ai="center" fw="wrap" gap="$2">
            <Paragraph>{holder_name}</Paragraph>
          </XStack>
          <Paragraph size="$2" theme="alt2">
            {notes}
          </Paragraph>
        </YStack>
      </XStack>
    </NavigableCard>
  );
}

export function ListKey({ data, estimatedItemSize, ...props }: ListProps) {
  const router = useRouter();

  return (
    <FlashList
      data={data}
      renderItem={({ item, index }) => (
        <KeyItem
          key={item.holderId}
          {...item}
          buttonOnPress={() => router.push(`/keys/${item.holderId}`)}
          mb={index === data.length - 1 ? null : '$3'}
        />
      )}
      estimatedItemSize={estimatedItemSize}
      {...props}
    />
  );
}
