import { PermissionCard } from "@/components/scan/PermissionCard";
import { Scanner } from "@/components/scan/Scanner";
import { Colors } from "@/constants/Colors";
import { useCameraState } from "@/hooks/useCameraState";
import { useQRScanner } from "@/hooks/useQRScanner";
import { useIsFocused } from "@react-navigation/native";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";
import { H4, Image, Paragraph, View, useWindowDimensions } from "tamagui";
import '../../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from 'react-i18next';

export default function ScanScreen() {
  const { width } = useWindowDimensions();
  const { permission, requestPermission, isCameraActive } = useCameraState();
  const { scanned, handleBarCodeScanned } = useQRScanner();
  const isFocused = useIsFocused();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const makeSurePotrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
    };

    makeSurePotrait();
  });

  return (
    <View flex={1} bg={Colors.primary} px="$3.5" py="$2.5" ai="center">
      <Image
        source={require("@/assets/images/bg/scan-top.png")}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <Image
        source={require("@/assets/images/bg/scan-bottom.png")}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      />
      <View ai="center" my="$10">
        <H4 color="white">{t('scanQR')}</H4>  {/* Translated QR scan title */}
        <Paragraph color="white">{t('ensureQRCode')}</Paragraph>  {/* Translated QR scan instruction */}
      </View>

      {!permission?.granted ? (
        <PermissionCard onRequestPermission={requestPermission} />
      ) : (
        isCameraActive &&
        isFocused && (
          <Scanner
            width={width}
            onScan={handleBarCodeScanned}
            isActive={!scanned}
          />
        )
      )}
    </View>
  );
}
