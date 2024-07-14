import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Feed } from '@components/organisms';
import { FeedEndContent } from '@components/molecules';
import { useFeed } from '@hooks';

const HomeTrending = () => {
  const { feedData } = useFeed();
  const [trendingData, setTrendingData] = useState<FeedProps[] | null>([]);

  const setDataToMostTrending = (feedData: FeedProps[]) => {
    const mostTrending = [...feedData].sort(
      (a, b) => b.post_upvote - a.post_upvote,
    );
    setTrendingData(mostTrending);
  };

  useEffect(() => {
    if (feedData) {
      setDataToMostTrending(feedData);
    }
  }, [feedData]);

  return (
    <View style={styles.container}>
      <FlatList
        data={trendingData}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => {
          return <Feed key={item.id} {...item} />;
        }}
        ListFooterComponent={<FeedEndContent />}
      />
    </View>
  );
};

export default HomeTrending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
