import { NotificationPop } from '@/components/NotificationPopover';
import { App } from '@/constants/App';
import { Colors } from '@/constants/Colors';
import { useCompany } from '@/hooks/useCompany';
import { Tabs } from 'expo-router';
import { Home, Notification, Scan, User } from 'iconsax-react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'tamagui';
import '../../i18n';

const SCREENS = [
  {
    name: 'home',
    title: 'home',
    Icon: Home,
  },
  {
    name: 'scan',
    title: 'scan',
    Icon: Scan,
  },
  {
    name: 'profile',
    title: 'profile',
    Icon: User,
  },
] as const;

export default function TabLayout() {
  const { company } = useCompany();
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={({ navigation }) => {
        const currentIndex = navigation.getState().index;
        const isScanScreen = currentIndex === 1;
        const isProfileScreen = currentIndex === 2;

        return {
          tabBarActiveTintColor: isScanScreen ? Colors.white : Colors.primary,
          tabBarStyle: {
            backgroundColor: isScanScreen ? Colors.primary : theme.background.val,
            borderTopColor: isScanScreen ? Colors.primary : theme.borderColor.val,
          },
          headerTitle: isProfileScreen ? `${company?.name} Company` : App.name,
          headerRight: ({ tintColor }) => (
            <NotificationPop
              placement="bottom"
              Icon={<Notification color={tintColor} />}
              Name="bottom-popover"
            />
          ),
          headerStyle: {
            backgroundColor: isScanScreen ? Colors.primary : theme.background.val,
            borderBottomColor: isScanScreen ? Colors.primary : theme.borderColor.val,
          },
          headerTintColor: isScanScreen ? Colors.white : theme.color.val,
        };
      }}>
      {SCREENS.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={({ navigation }) => {
            const currentIndex = navigation.getState().index;

            return {
              title: t(title),
              tabBarIcon: ({ color, focused }) => (
                <Icon
                  color={color}
                  variant={currentIndex === 1 ? 'Bold' : focused ? 'Bold' : 'TwoTone'}
                />
              ),
            };
          }}
        />
      ))}
    </Tabs>
  );
}
