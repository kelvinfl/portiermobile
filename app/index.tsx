import React, { useEffect } from "react";

import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import { Button, H1, Image, Text, XStack, YStack, ZStack } from "tamagui";
import { useSession } from "@/hooks/useSession";
import '../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from "react-i18next"; // Impor hook useTranslation
import { Redirect, useRouter } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import * as WebBrowser from "expo-web-browser";
import { GreetingBottomBlob } from "@/components/blobs/GreetingBottom";
import { GreetingTopBlob } from "@/components/blobs/GreetingTop";
import { Colors } from "@/constants/Colors";


WebBrowser.maybeCompleteAuthSession();

export default function Index() {
  const { signIn, session, error } = useSession();
  const { t, i18n } = useTranslation(); // Inisialisasi hook useTranslation
  const router = useRouter();

  useEffect(() => {
    WebBrowser.warmUpAsync();

    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  useEffect(() => {
    const makeSurePotrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    };

    makeSurePotrait();
  }, []);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: "An error occurred",
        text2: error,
      });
    }

    return () => {
      Toast.hide();
    };
  }, [error]);

  if (session) {
    return <Redirect href="/(tabs)/home" />;
  }

  return (
    <ZStack flex={1} backgroundColor={Colors.primary}>
      {/* Top Blob */}
      <GreetingTopBlob style={styles.topBlob} />

      {/* Bottom Blob */}
      <GreetingBottomBlob style={styles.bottomBlob} />

      {/* Main Content */}
      <YStack
        flex={1}
        padding="$4"
        gap="$4"
        justifyContent="center"
        alignItems="center"
        fullscreen
      >
        {/* Image Banner */}
        <XStack justifyContent="center">
          <Image
            source={require("../assets/images/banner/greeting.png")}
            style={styles.bannerImage}
          />
        </XStack>

        {/* Headline and Description */}
        <YStack gap="$2" marginTop={-50}>
          <H1 color="white" textAlign="center" size="$9">
            {t('greeting')} {/* Gunakan terjemahan */}
          </H1>
          <Text color="$white8" fontSize="$4" textAlign="center">
            {t('description')} {/* Gunakan terjemahan */}
          </Text>
        </YStack>

        {/* Buttons */}
        <YStack gap="$3" marginTop="$4" width={"90%"}>
          <Button
            size="$5"
            backgroundColor="white"
            color={Colors.primary}
            borderRadius="$12"
            themeInverse
            onPress={() => signIn()}
          >
            {t('signIn')} {/* Gunakan terjemahan */}
          </Button>

          <Button
            size="$5"
            variant="outlined"
            borderColor="white"
            color="white"
            borderRadius="$12"
            themeInverse
            onPress={() => router.push("/home")}
          >
            {t('continueWithoutSignIn')} {/* Gunakan terjemahan */}
          </Button>
        </YStack>
      </YStack>
    </ZStack>
  );
}

const styles = StyleSheet.create({
  topBlob: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 200,
  },
  bottomBlob: {
    position: "absolute",
    bottom: -18,
    right: -32,
    width: "100%",
    height: 491,
  },
  bannerImage: {
    width: 395,
    height: 395,
  },
});
