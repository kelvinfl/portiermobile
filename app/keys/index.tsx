import { fetchKeys, searchKeys } from "@/api/key";
import { ListKey } from "@/components/keys/ListKey";
import { Key } from "@/types/key";
import { SearchNormal } from "iconsax-react-native";
import React, { useEffect, useState } from "react";
import { Button, Input, useTheme, View, XStack } from "tamagui";

export default function KeysScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<Key[]>([]);

  const handleSearch = async () => {
    try {
      const results = await searchKeys(searchQuery);
      setResults(results);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actvities = await fetchKeys({ limit: 5 });
        setResults(actvities);
      } catch (err) {
        console.error("Error fetching keys:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <View px="$3.5" py="$2.5" gap="$3.5">
      <XStack width="100%" alignItems="center">
        <Input
          flex={1}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search..."
          onSubmitEditing={handleSearch}
        />
        <Button
          position="absolute"
          r="$2"
          backgroundColor="transparent"
          onPress={handleSearch}
          pressStyle={{ opacity: 0.7 }}
          p="$4"
          iconAfter={<SearchNormal size={20} color={theme.gray11.val} />}
        />
      </XStack>
      <View w="100%" h="100%">
        <ListKey data={results} estimatedItemSize={10} />
      </View>
    </View>
  );
}
