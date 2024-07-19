import React, { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { FeedEndContent } from '@components/molecules';
import { Feed } from '@components/organisms';
import { useFeed } from '@hooks';
import { generateHomeData } from '@utils/helper';

const HomeNew = () => {
  const { feedData, setFeedData } = useFeed();
  const [refreshing, setRefreshing] = useState(false);
  const newData = useMemo(() => {
    return [...feedData].sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );
  }, [feedData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setFeedData(generateHomeData());
    setRefreshing(false);
  }, []);

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
