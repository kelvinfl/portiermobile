import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Card, Paragraph, XStack, YStack } from "tamagui";
import { Chip } from "../Chip";
import { NavigableCard } from "../NavigableCard";
import { IssueIcon } from "./IssueIcon";

type Issue = {
  issueId: string;
  name: string;
  description: string;
  status: string;
  type: string;
};

type IssueItemProps = Issue & {
  buttonOnPress?: () => void;
};

function IssueItem({
  issueId,
  name,
  description,
  status,
  type,
  buttonOnPress,
  ...props
}: IssueItemProps) {
  return (
    <NavigableCard {...props} buttonOnPress={buttonOnPress}>
      <XStack f={1} ai="center" gap="$3">
        <IssueIcon status={status} type={type} />
        <YStack f={1} gap="$1">
          <XStack ai="center" fw="wrap" gap="$2">
            <Paragraph>{name}</Paragraph>
            <Chip px="$2" py="$1" status={status} text={status} />
          </XStack>
          <Paragraph size="$2" theme="alt2">
            {description}
          </Paragraph>
        </YStack>
      </XStack>
    </NavigableCard>
  );
}

type ListIssueProps = {
  accessTokens: string | null; // Access token passed as a prop
  history: boolean; // New history prop to control filtering
};

const X_PORTIER_AGENT = "portier/Vision (Windows 11; v5.0.1)";

export function ListIssue({ accessTokens, history }: ListIssueProps) {
  const [data, setData] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false); // State to track pull-to-refresh
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    let url = "";
  
    try {
      if (accessTokens) {
        url = "http://192.168.1.33:1323/api/v1/key-otg/auth/sign"; // Ganti dengan IP server
        console.log("Access token detected:", accessTokens);
      } else {
        console.log("Fetching without access token...");
        const savedRequestIds = localStorage.getItem("requestIds");
        if (savedRequestIds) {
          const requestIds = JSON.parse(savedRequestIds);
          const requestIdList = requestIds.join(",");
          url = `http://192.168.1.33:1323/api/v1/key-otg/sign/${requestIdList}?token=${requestIdList}`;
          console.log("Generated URL:", url);
        } else {
          throw new Error("No request IDs found in localStorage.");
        }
      }
  
      const response = await fetch(url, {
        headers: accessTokens
          ? { Authorization: `Bearer ${accessTokens}` }
          : { "X-Portier-Agent": X_PORTIER_AGENT },
      });
  
      if (!response.ok) {
        console.error("API Error:", response.statusText);
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
  
      const result = await response.json();
      console.log("Fetched data:", result);
  
      if (result.data) {
        // Mengelompokkan data berdasarkan request_id
        const groupedIssues = result.data.reduce((acc, item) => {
          if (!acc[item.request_id]) {
            acc[item.request_id] = {
              issueId: item.request_id,
              name: item.holder_name,
              description: item.notes,
              status: item.status || "pending",
              type: item.type || "unknown",
            };
          }
          return acc;
        }, {});
  
        // Mengonversi objek kembali menjadi array
        const uniqueIssues = Object.values(groupedIssues);
  
        // Menyaring data berdasarkan status jika diperlukan
        setData(history ? uniqueIssues : uniqueIssues.filter((i) => i.status === "pending"));
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [accessTokens, history]);

  if (loading) {
    return <Paragraph>Loading...</Paragraph>;
  }

  if (error) {
    return <Paragraph color="red">{error}</Paragraph>;
  }

  if (data.length === 0) {
    return <Paragraph>No issues found.</Paragraph>;
  }

  return (
    <FlashList
      data={data}
      renderItem={({ item, index }) => (
        <IssueItem
          key={item.issueId}
          {...item}
          buttonOnPress={() => {
            if (item.status === "pending") {
              router.push({
                pathname: "/issues/sign",
                params: { token: item.issueId },
              });
            } else {
              router.push({
                pathname: "/issues/detail",
                params: { token: item.issueId },
              });
            }
          }}
          mb={index === data.length - 1 ? null : "$3"}
        />
      )}
      estimatedItemSize={100}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    />
  );
}
