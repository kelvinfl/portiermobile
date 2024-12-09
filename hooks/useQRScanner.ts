import type { BarcodeScanningResult } from "expo-camera";
import { router } from "expo-router";
import { useCallback, useState } from "react";

export const useQRScanner = () => {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = useCallback(
    ({ data }: BarcodeScanningResult) => {
      if (scanned) return; // Prevent duplicate scans
      setScanned(true);

      console.log("Scanned token:", data);

      if (typeof data !== "string" || data.trim() === "") {
        console.error("Scanned data is not valid:", data);
        alert("Invalid QR Code: Scanned data is empty or not a valid string.");
        setScanned(false);
        return;
      }

      // Assume the scanned data is the token
      const token = data;

      console.log("Extracted token:", token);

      if (token) {
        setScanned(false);
        router.push({
          pathname: "/issues/sign",
          params: {
            token: token,
          },
        });
        return;
      }

      console.error("No valid token found:", data);
      alert("Invalid QR Code: Token not found in the scanned data.");
      setScanned(false);
    },
    [scanned]
  );

  return {
    scanned,
    setScanned,
    handleBarCodeScanned,
  };
};
