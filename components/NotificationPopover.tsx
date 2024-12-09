import { Notification } from "iconsax-react-native";
import { FlatList } from "react-native";
import type { PopoverProps } from "tamagui";
import { Button, Popover, Text, XStack, YStack } from "tamagui";

type Props = {
  tintColor?: string;
};

export function NotificationPopover({ tintColor }: Props) {
  return (
    <YStack gap="$4">
      <XStack gap="$2" flex={1} justifyContent="center" alignItems="center">
        <NotificationPop
          placement="bottom"
          Icon={<Notification color={tintColor} />}
          Name="bottom-popover"
        />
      </XStack>
    </YStack>
  );
}

export function NotificationPop({
  Icon,
  Name,
  shouldAdapt,
  ...props
}: PopoverProps & { Icon?: any; Name?: string; shouldAdapt?: boolean }) {
  return (
    <Popover size="$5" allowFlip {...props}>
      <Popover.Trigger asChild>
        <Button icon={Icon} chromeless />
      </Popover.Trigger>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        mr="$2.5"
        animation={[
          "quick",
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

        <YStack gap="$3" width={"$20"}>
          <FlatList
            data={[
              { key: "1", title: "Notification 1", message: "Message 1" },
              { key: "2", title: "Notification 2", message: "Message 2" },
              { key: "3", title: "Notification 3", message: "Message 3" },
              { key: "4", title: "Notification 4", message: "Message 4" },
              { key: "5", title: "Notification 5", message: "Message 5" },
            ]}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
        </YStack>
      </Popover.Content>
    </Popover>
  );
}
