import { getKeyById } from "@/api/key";
import { Colors } from "@/constants/Colors";
import { Key } from "@/types/key";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Location } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Card, Spinner, Text, View } from "tamagui";
import '../../i18n'; // Jika i18n.ts berada di root proyek
import { useTranslation } from "react-i18next"; // Impor hook useTranslation

export default function DetailKey() {
  const { id } = useLocalSearchParams();
  const [key, setKey] = useState<Key | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchKey = async () => {
      if (typeof id === "string") {
        const key = await getKeyById(parseInt(id));
        setKey(key);
      }
    };

    fetchKey();
  }, [id]);
  const { t, i18n } = useTranslation(); // Inisialisasi hook useTranslation
  useEffect(() => {
    if (key) {
      navigation.setOptions({ headerTitle: key.name });
    }
  }, [key, navigation]);

  if (!key) {
    return (
      <View flex={1} alignItems="center" justifyContent="center">
        <Spinner size="large" />
      </View>
    );
  }

  return (
    <View px="$3.5" py="$2.5" gap="$3.5">
      <Card padded bordered fd="row" ai="center" gap="$2">
        <View>
          <Text fontSize={12} fontWeight={400}>
            {key?.name}
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {key?.pic}
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {key?.spesification}
          </Text>
        </View>
      </Card>
      <Card padded bordered gap="$2">
        <View fd="row" ai="center" gap="$2">
          <Location color={Colors.danger} />
          <View>
            <Text fontSize={12} fontWeight={400}>
              {key?.location?.name}
            </Text>
            <Text fontSize={12} fontWeight={400}>
              {key?.location?.address}
            </Text>
          </View>
        </View>
        {/* TODO: add flag via firebase remote config */}
        {/* {(Platform.OS === "ios" || Platform.OS === "android") && (
          <MapView
            initialRegion={{
              latitude: issue?.location?.latitude || 0,
              longitude: issue?.location?.longitude || 0,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )} */}
      </Card>
      <Card padded bordered gap="$2">
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
            {t('createdAt')}
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {new Date(key.createdAt || new Date()).toLocaleString()}
          </Text>
        </View>
        <View fd="row" ai="center" gap="$2">
          <Text fontSize={12} fontWeight={400}>
          {t('updatedAt')}
          </Text>
          <Text fontSize={12} fontWeight={400}>
            {new Date(key.updatedAt || new Date()).toLocaleString()}
          </Text>
        </View>
      </Card>
    </View>
  );
}
