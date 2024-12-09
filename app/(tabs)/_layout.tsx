import { NotificationPop } from "@/components/NotificationPopover";
import { App } from "@/constants/App";
import { Colors } from "@/constants/Colors";
import { useCompany } from "@/hooks/useCompany";
import { Tabs } from "expo-router";
import { Home, Notification, Scan, User } from "iconsax-react-native";
import { useTheme } from "tamagui";
import '../../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from 'react-i18next';
import { useStorage } from '@/hooks/useStorage';
import React, { useEffect, useState } from "react";


  const { t, i18n } = useTranslation();



  const SCREENS = [
    {
      name: "home",
      title: "home", // Use the key for translation
      Icon: Home,
    },
    {
      name: "scan",
      title: "scan",
      Icon: Scan,
    },
    {
      name: "profile",
      title: "profile",
      Icon: User,
    },
  ] as const;
  
  export default function TabLayout() {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const { remove, get, set } = useStorage();  // Menggunakan remove dan get dari useStorage
    const { company } = useCompany();
    const theme = useTheme();
    const { t } = useTranslation();  // Import `t` for translation
    const handleToken = async () => {
      console.log("terteken");
      const token = await get('auth_access_token'); // Mengambil token sekali
      console.log(token); // Pastikan token yang diambil sesuai
      if (token) {
        setAccessToken(token); // Menyimpan token ke dalam state jika ada
      }
    };
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
        }}
      >
        {SCREENS.map(({ name, title, Icon }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={({ navigation }) => {
              const currentIndex = navigation.getState().index;
  
              return {
                // Use the translation here inside the title property
                title: t(title), 
                tabBarIcon: ({ color, focused }) => (
                  <Icon
                    color={color}
                    variant={currentIndex === 1 ? "Bold" : focused ? "Bold" : "TwoTone"}
                  />
                ),
              };
            }}
          />
        ))}
      </Tabs>
    );
  }
