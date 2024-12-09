import { Colors } from "@/constants/Colors";
import { User } from "iconsax-react-native";
import React from "react";
import { Avatar, Card, H4, Paragraph, View } from "tamagui";

type Props = {
  session: Record<string, any> | null;
};

export function UserCard({ session }: Props) {
  return (
    <Card bordered padded fd="row" ai="center" gap="$4">
      <Avatar circular size="$4.5" borderWidth={2}>
        <Avatar.Image
          accessibilityLabel="Cam"
          source={{
            uri: session?.avatar,
          }}
        />
        <Avatar.Fallback ai="center" alignSelf="center">
          <User size={36} color={Colors.black} />
        </Avatar.Fallback>
      </Avatar>
      <View>
        <H4 fontSize={16}>{session?.name}</H4>
        <Paragraph fontSize={12}>{session?.email}</Paragraph>
      </View>
    </Card>
  );
}
