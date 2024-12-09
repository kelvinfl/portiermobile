import type { BarcodeScanningResult } from "expo-camera";
import { CameraView } from "expo-camera";
import { View } from "tamagui";

interface ScannerProps {
  width: number;
  onScan: (result: BarcodeScanningResult) => void;
  isActive: boolean;
}

export const Scanner = ({ width, onScan, isActive }: ScannerProps) => {
  const dimensions = {
    width: width - 32,
    height: width - 32,
  };

  return (
    <View
      w={dimensions.width}
      h={dimensions.height}
      style={{
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <CameraView
        facing="back"
        style={{
          ...dimensions,
          aspectRatio: 1,
        }}
        onBarcodeScanned={isActive ? onScan : undefined}
      />
    </View>
  );
};
