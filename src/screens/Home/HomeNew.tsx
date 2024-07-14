import React, { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Feed } from '@components/organisms';
import { FeedEndContent } from '@components/molecules';
import { useFeed } from '@hooks';
import { generateHomeData } from '@utils/helper';

const HomeNew = () => {
  const { feedData, setFeedData } = useFeed();
  const [newData, setNewData] = useState<FeedProps[] | null>([]);
  const [refreshing, setRefreshing] = useState(false);

  const setDataToMostRecent = (feedData: FeedProps[]) => {
    const mostRecent = [...feedData].sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );
    setNewData(mostRecent);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setFeedData(generateHomeData());
    setRefreshing(false)
  }, []);

  useEffect(() => {
    if (feedData) {
      setDataToMostRecent(feedData);
    }
  }, [feedData]);

  return (
    <View style={styles.container}>
      <FlatList
        data={newData}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => {
          return <Feed key={item.id} {...item} />;
        }}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={<FeedEndContent />}
      />
    </View>
  );
};

export default memo(HomeNew);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
