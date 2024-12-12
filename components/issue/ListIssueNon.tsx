import React, { useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { Card, Paragraph, XStack, YStack } from "tamagui";
import { Chip } from "../Chip";
import { NavigableCard } from "../NavigableCard";
import { IssueIcon } from "./IssueIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";  // Import AsyncStorage

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
  history: boolean; // New history prop to control filtering
};

const X_PORTIER_AGENT = 'portier/Vision (Windows 11; v5.0.1)';

export function ListIssueNon({ history }: ListIssueProps) {
  const [data, setData] = useState<Issue[]>([]);
  const [requestIds, setRequestIds] = useState<string[]>([]);  // State for request IDs
  const router = useRouter();

  const fetchData = async () => {
    // Fetch request IDs from AsyncStorage
    const savedRequestIds = await AsyncStorage.getItem("requestIds");
    console.log("list request id", savedRequestIds);

    if (savedRequestIds) {
      const requestIds = JSON.parse(savedRequestIds);

      // Make individual API calls for each request ID
      const allIssues = await Promise.all(
        requestIds.map(async (requestId: string) => {
          const url = `http://192.168.1.33:1323/api/v1/key-otg/sign/${requestId}?token=${requestId}`;
          try {
            const response = await fetch(url, {
              headers: {
                'X-Portier-Agent': X_PORTIER_AGENT, // Add X-Portier-Agent header when no accessTokens are used
              },
            });

            const result = await response.json();

            if (response.ok && result.data) {
              return {
                issueId: result.data.request_id,
                name: result.data.holder_name,
                description: result.data.notes,
                status: result.data.status || "pending",
                type: result.data.type || "unknown",
              };
            } else {
              console.log(`Failed to fetch data for requestId: ${requestId}`);
              return null;
            }
          } catch (error) {
            console.error("Error fetching issue:", error);
            return null;
          }
        })
      );

      // Filter out any null values (failed API calls)
      const issues = allIssues.filter(issue => issue !== null);

      // If history is true, show all issues (no filter)
      if (history) {
        setData(issues);
      } else {
        // If history is false, only show "pending" issues
        const filteredIssues = issues.filter(issue => issue.status === "pending");
        setData(filteredIssues);
      }
    } else {
      console.log("No request IDs found.");
    }
  };

  useEffect(() => {
    fetchData();
    // Fetch request IDs from AsyncStorage when the component mounts
    const loadRequestIds = async () => {
      const savedRequestIds = await AsyncStorage.getItem("requestIds");
      if (savedRequestIds) {
        setRequestIds(JSON.parse(savedRequestIds));
      }
    };

    

    loadRequestIds();
  }, [history]); // Refetch data when `history` prop changes

  if (data.length === 0) {
    return <Paragraph>{requestIds.length > 0 ? `Request IDs found: ${requestIds.join(", ")}` : "No request IDs found."}</Paragraph>;
  }

  return (
    <FlashList
      data={data}
      renderItem={({ item, index }) => (
        <IssueItem
          key={item.issueId}
          {...item}
          buttonOnPress={() => {
            // Navigate based on status
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
    />
  );
}
