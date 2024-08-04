import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { FeedEndContent } from '@components/molecules';
import { Feed } from '@components/organisms';
import { useFeed } from '@store';
import { GetFeedsRequest } from '@services';

const HomeNew = () => {
  const sortBy: GetFeedsRequest['sort_by'] = useMemo(() => {
    return 'created_at';
  }, []);
  const feeds = useFeed(state => state.feedsNew);
  const isLoading = useFeed(state => state.isLoading);
  const onRefreshFeed = useFeed(state => state.onRefreshFeed);
  const fetchMoreFeeds = useFeed(state => state.fetchMoreFeeds);

  useEffect(() => {
    onRefreshFeed({ sort_by: sortBy })
  }, [onRefreshFeed]);

  return (
    <View style={styles.container}>
      <FlatList
        data={feeds}
        keyExtractor={(item, index) => item.id}
        refreshing={isLoading}
        onRefresh={() => onRefreshFeed({ sort_by: sortBy })}
        ListFooterComponent={<FeedEndContent />}
        onEndReached={() => fetchMoreFeeds({ sort_by: sortBy })}
        renderItem={({ item }) => {
          return (
            <Feed
              key={item.id}
              id={item.id}
              avatarUrl={item.user?.profile_path}
              createdAt={item.time}
              headline={item.user?.headline}
              name={item.user?.name}
              postComment={item.total_comments}
              postContent={item.content}
              postHeader={item.header}
              postTopic={item.topic.label}
              postUpvote={item.upvotes}
            />
          );
        }}
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
