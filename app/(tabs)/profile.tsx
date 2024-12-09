import React, { useState, useEffect } from 'react';
import { View, Button, H4, ListItem, Switch, YGroup } from 'tamagui';
import '../../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from 'react-i18next';
import { UserCard } from '@/components/user/UserCard';
import { App } from '@/constants/App';
import { Colors } from '@/constants/Colors';
import { LogoutCurve, Notification } from 'iconsax-react-native';
import { useSession } from '@/hooks/useSession';
import { useStorage } from '@/hooks/useStorage';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { session } = useSession();  // Menambahkan signOut dari hook useSession
  const { remove, get, set } = useStorage();  // Menggunakan remove dan get dari useStorage
  const [language, setLanguage] = useState(i18n.language);
  const router = useRouter();  // Router untuk navigasi ke halaman index

  useEffect(() => {
    const makeSurePotrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
    makeSurePotrait();

    // Cek bahasa yang ada di storage saat pertama kali render
    const fetchLanguage = async () => {
      const storedLanguage = await get('language');  // Ambil bahasa dari storage
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);  // Ubah bahasa i18n sesuai dengan yang ada di storage
        setLanguage(storedLanguage);  // Update state language
      }
    };

    fetchLanguage();  // Jalankan fungsi untuk mengambil bahasa
  }, [i18n, get]);  // Dependensi hanya diubah saat i18n atau get berubah

  const handleLanguageChange = async (lang) => {
    await setLanguage(lang); // Update state with the new language
    i18n.changeLanguage(lang); // Change the language in i18next
    
    // Log the selected language to the console
    console.log(`Language changed to: ${lang}`);
  
    // Save the new language to storage
    await set('language', lang); // Store the language to storage (no need to remove before setting)
  };

  const handleLogout = async () => {
    console.log("terteken");
    // Hapus data session (misalnya token atau informasi pengguna) menggunakan remove
    await remove('auth_access_token');  // Pastikan 'auth_access_token' adalah kunci yang digunakan untuk menyimpan session
    router.push('../');  // Redirect ke halaman index setelah logout
  };

  return (
    <View px="$3.5" py="$2.5" gap="$3.5">
      <UserCard session={session} />
      <H4>{t('general')}</H4>

      <YGroup alignSelf="center" bordered width={"100%"} size="$4">
        <YGroup.Item>
          <ListItem
            hoverTheme
            icon={<Notification color={Colors.black} />}
            title={t('notification')}
            subTitle={t('allowNotification', { appName: App.name })}
            iconAfter={
              <Switch size="$2">
                <Switch.Thumb animation="quicker" />
              </Switch>
            }
          />
        </YGroup.Item>
      </YGroup>

      <YGroup alignSelf="center" bordered width={"100%"} size="$4">
        <YGroup.Item>
          <ListItem
            hoverTheme
            title={t('language')}
            subTitle=  {t('currentLanguage', { language: language === 'en' ? 'English' : 'Deutsch' })}
            iconAfter={
              <Switch
                size="$2"
                defaultChecked={language === 'de'}
                onCheckedChange={(checked) => handleLanguageChange(checked ? 'de' : 'en')}
              >
                <Switch.Thumb animation="quicker" />
              </Switch>
            }
          />
        </YGroup.Item>
      </YGroup>

      {session && (
        <View gap="$3.5">
          <H4>{t('account')}</H4>
          <Button
            bordered
            backgroundColor="red"
            borderColor="red"
            icon={<LogoutCurve color="red" />}
            onPress={handleLogout}  // Panggil handleLogout saat tombol logout diklik
          >
            {t('signOut')}
          </Button>
        </View>
      )}
    </View>
  );
}
