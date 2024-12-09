import Constants from "expo-constants";
import { Platform } from "react-native";

export const App = {
  name: Constants.expoConfig?.name || "KeyOnTheGo",
  version: Constants.expoConfig?.version || "0.0.1",
  os: {
    isIos: Platform.OS === "ios",
    isAndroid: Platform.OS === "android",
    version: Platform.Version,
  },
  scheme: `${Constants.expoConfig?.scheme}` || "keyonthego",
  android: {
    package:
      Constants.expoConfig?.android?.package ?? "com.portierglobal.keyonthego",
  },
  ios: {
    bundle:
      Constants.expoConfig?.ios?.bundleIdentifier ??
      "com.portierglobal.keyonthego",
  },
} as const;
