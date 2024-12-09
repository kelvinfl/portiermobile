import { useIsFocused } from "@react-navigation/native";
import { useCameraPermissions } from "expo-camera";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";

export const useCameraState = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      setIsCameraActive(false);
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setIsCameraActive(isFocused && Boolean(permission?.granted));
  }, [isFocused, permission?.granted]);

  return {
    permission,
    requestPermission,
    isCameraActive,
  };
};
