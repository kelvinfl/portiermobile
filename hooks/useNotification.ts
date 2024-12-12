import { useToastController } from '@tamagui/toast';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function useNotification() {
  const toast = useToastController();
  const [isAllowed, setIsAllowed] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined,
  );

  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        if (token) {
          setExpoPushToken(token);
          setIsAllowed(true);
        }
      })
      .catch((error) => {
        setIsAllowed(false);
      });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response received:', response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  function handleRegistrationError(message: string) {
    toast.show('Notification Error', {
      message,
      variant: 'error',
      duration: 3000,
      onClose: () => setIsAllowed(false),
    });
    throw new Error(message);
  }

  async function registerForPushNotificationsAsync(): Promise<string | null> {
    if (!Device.isDevice) {
      handleRegistrationError('Push notifications only work on physical devices.');
      return null;
    }

    try {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notifications.');
        return null;
      }

      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;

      if (!projectId) {
        handleRegistrationError('Project ID not found.');
        return null;
      }

      const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;

      console.log('Expo push token:', pushToken);
      return pushToken;
    } catch (error) {
      handleRegistrationError(`Failed to get push token: ${error}`);
      return null;
    }
  }

  function denyPermission() {
    setIsAllowed(false);
  }

  return {
    isAllowed,
    expoPushToken,
    notification,
    requestPermission: registerForPushNotificationsAsync,
    denyPermission,
  };
}
