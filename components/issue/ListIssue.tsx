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

    if (accessTokens) {
      url =
        "https://kotg-server-531186732263.asia-southeast2.run.app/api/v1/key-otg/auth/sign";
      console.log(accessTokens);
    } else {
      console.log("history tanpa login");
      const savedRequestIds = localStorage.getItem("requestIds");
      console.log("list request id", savedRequestIds);

      if (savedRequestIds) {
        const requestIds = JSON.parse(savedRequestIds);
        const requestIdList = requestIds.join(","); // Use request_ids
        url = `https://kotg-server-531186732263.asia-southeast2.run.app/api/v1/key-otg/sign/${requestIdList}?token=${requestIdList}`;
        console.log(url);
      } else {
        setError("No request IDs found in localStorage.");
        console.log("No request IDs found.");
        return;
      }
    }

    try {
      const response = await fetch(url, {
        headers: accessTokens
          ? {
              Authorization: `Bearer ${accessTokens}`,
            }
          : {
              "X-Portier-Agent": X_PORTIER_AGENT, // Add X-Portier-Agent header when no accessTokens are used
            },
      });

      const result = await response.json();

      if (response.ok && result.data) {
        let issues = result.data.map((item: any) => ({
          issueId: item.request_id,
          name: item.holder_name,
          description: item.notes,
          status: item.status || "pending",
          type: item.type || "unknown",
        }));

        // Filter unique issues by `request_id`
        const uniqueIssues = Array.from(
          new Map(issues.map((issue) => [issue.issueId, issue])).values()
        );

        // If history is true, show all unique issues (no filter)
        if (history) {
          setData(uniqueIssues);
        } else {
          // If history is false, only show "pending" unique issues
          const filteredIssues = uniqueIssues.filter(
            (issue) => issue.status === "pending"
          );
          setData(filteredIssues);
        }
      } else {
        setError("Failed to fetch data.");
      }
    } catch (error) {
      setError("Error fetching issues.");
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing when done
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
