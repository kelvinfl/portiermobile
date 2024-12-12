import { UserCard } from '@/components/user/UserCard';
import { App } from '@/constants/App';
import { Colors } from '@/constants/Colors';
import { useSession } from '@/hooks/useSession';
import { useStorage } from '@/hooks/useStorage';
import { useRouter } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { LogoutCurve, Notification } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, H4, ListItem, Switch, View, YGroup } from 'tamagui';
import '../../i18n';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { session } = useSession();
  const { remove, get, set } = useStorage();
  const [language, setLanguage] = useState(i18n.language);
  const router = useRouter();

  useEffect(() => {
    const makeSurePotrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };
    makeSurePotrait();

    const fetchLanguage = async () => {
      const storedLanguage = await get('language');
      if (storedLanguage) {
        i18n.changeLanguage(storedLanguage);
        setLanguage(storedLanguage);
      }
    };

    fetchLanguage();
  }, [i18n, get]);

  const handleLanguageChange = async (lang: string) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    console.log(`Language changed to: ${lang}`);
    await set('language', lang);
  };

  const handleLogout = async () => {
    console.log('terteken');
    await remove('auth_access_token');
    router.push('../');
  };

  return (
    <View px="$3.5" py="$2.5" gap="$3.5">
      <UserCard session={session} />
      <H4>{t('general')}</H4>

      <YGroup alignSelf="center" bordered width={'100%'} size="$4">
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

      <YGroup alignSelf="center" bordered width={'100%'} size="$4">
        <YGroup.Item>
          <ListItem
            hoverTheme
            title={t('language')}
            subTitle={t('currentLanguage', {
              language: language === 'en' ? 'English' : 'Deutsch',
            })}
            iconAfter={
              <Switch
                size="$2"
                defaultChecked={language === 'de'}
                onCheckedChange={(checked) => handleLanguageChange(checked ? 'de' : 'en')}>
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
            onPress={handleLogout}>
            {t('signOut')}
          </Button>
        </View>
      )}
    </View>
  );
}
