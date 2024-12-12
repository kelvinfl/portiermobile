import { Stack } from 'expo-router';
import React from 'react';
import { useTheme } from 'tamagui';

export default function KeyLayout() {
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
          headerTitle: 'Key List',
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerTitle: 'Key',
        }}
      />
    </Stack>
  );
}
