import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from 'tamagui';

export default function IssueLayout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background.val,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: 'Issue History',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Issue',
        }}
      />
      <Stack.Screen
        name="sign"
        options={{
          headerTitle: 'Sign key',
        }}
      />
    </Stack>
  );
}
