import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Feed } from '@components/organisms';
import { FeedEndContent } from '@components/molecules';
import { useFeed } from '@hooks';

const HomeNew = () => {
  const { feedData } = useFeed();
  const [newData, setNewData] = useState<FeedProps[] | null>([]);

  const setDataToMostRecent = (feedData: FeedProps[]) => {
    const mostRecent = [...feedData].sort(
      (a, b) => b.created_at.getTime() - a.created_at.getTime(),
    );
    setNewData(mostRecent);
  };

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
        ListFooterComponent={<FeedEndContent />}
      />
    </View>
  );
};

export default HomeNew;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
