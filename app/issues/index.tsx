import { fetchIssues, searchIssues } from '@/api/issue';
import { ListIssue } from '@/components/issue/ListIssue';
import { Issue } from '@/types/issue';
import { SearchNormal } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input, useTheme, View, XStack } from 'tamagui';

export default function IssuesScreen() {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Issue[]>([]);

  const handleSearch = async () => {
    try {
      const results = await searchIssues(searchQuery);
      setResults(results);
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actvities = await fetchIssues({ limit: 5 });
        setResults(actvities);
      } catch (error) {
        console.log('err', error);
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
        <ListIssue data={results} estimatedItemSize={10} />
      </View>
    </View>
  );
}
