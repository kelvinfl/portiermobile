import { Toast, useToastState } from "@tamagui/toast";
import { useEffect, useMemo } from "react";
import { ThemeName, YStack, isWeb } from "tamagui";

export function CurrentToast() {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) return null;

  const theme = useMemo<ThemeName>(() => {
    switch (currentToast.variant) {
      case "error":
        return "red";
      case "warning":
        return "yellow";
      case "success":
        return "green";
      default:
        return "active";
    }
  }, [currentToast.variant]);

  useEffect(() => {
    currentToast.onClose?.();
  }, [currentToast.onClose]);

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? "$12" : 0}
      theme={theme}
      br="$6"
      animation="quick"
    >
      <YStack ai="center" p="$2" gap="$2">
        <Toast.Title fow="bold">{currentToast.title}</Toast.Title>
        {currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
}
