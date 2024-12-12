import { Status } from "@/types";
import { type UserStatistics } from "@/types/user";
import React from "react";
import { useTranslation } from "react-i18next"; // Impor hook useTranslation
import { Card, H3, Image, Paragraph, View, XStack } from "tamagui";
import "../../i18n"; // Jika i18n.ts berada di root proyek
import { Chip } from "../Chip";

interface StatisticsProps extends UserStatistics {}

const StatisticItem = ({
  label,
  count,
  status,
}: {
  label: string;
  count: string | number;
  status: Status;
}) => (
  <XStack ai="center">
    <Paragraph fow="400" mr="$2">
      {label}
    </Paragraph>
    <Chip status={status} text={count} />
  </XStack>
);

export function Statistics({ success, pending, failed }: StatisticsProps) {
  const { t } = useTranslation();
  return (
    <Card elevate bordered theme="red">
      <Card.Header>
        <H3>{t("statistics.title")}</H3>
        <Paragraph theme="alt2">{t("statistics.description")}</Paragraph>
      </Card.Header>

      <View mx="$4" gap="$2" mb="$4">
        <StatisticItem
          label={t("statistics.pending")}
          count={pending}
          status="pending"
        />
        <StatisticItem
          label={t("statistics.success")}
          count={success}
          status="success"
        />
        <StatisticItem
          label={t("statistics.failed")}
          count={failed}
          status="failed"
        />
      </View>

      <Card.Background>
        <Image
          als="flex-end"
          h="100%"
          w="50%"
          source={require("@/assets/images/bg/user-statistics.png")}
        />
      </Card.Background>
    </Card>
  );
}