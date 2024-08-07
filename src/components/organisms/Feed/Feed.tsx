import React, { memo, useCallback, useMemo } from 'react';
import { Alert, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';

import { Avatar, Icon, Label, Typography } from '@components/atom';
import { FeedActionButton } from '@components/molecules';
import { COLORS } from '@constant';
import { redirectOnUnauthorized } from '@utils/helper';
import { useAuth, useFeed } from '@store';

type FeedProps = {
  id: string;
  createdAt: string;
  avatarUrl: string;
  name: string;
  headline: string | null;
  postHeader: string;
  postContent: string;
  postTopic: string;
  postUpvote: number;
  postComment: number;
};

const Feed: React.FC<FeedProps> = feed => {
  const { user } = useAuth();
  const upvoteFeed = useFeed(state => state.upvoteFeed);
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();

  const handlePress = useCallback((action: () => void) => {
    const isAllowed = redirectOnUnauthorized(user, navigation);
    if (!isAllowed) return

    action();
  }, [user, navigation]);

  const onPressContent = useCallback(() => {
    handlePress(() => navigation.navigate('FeedDetail', { id: feed.id }));
  }, [handlePress, navigation, feed.id]);

  const onPressHeaderAction = useCallback(() => {
    handlePress(() => { });
  }, [handlePress]);

  const onPressUpvote = useCallback(() => {
    handlePress(async () => {
      analytics().logEvent('click_upvote', {
        username: user?.username,
        post_id: feed.id
      });

      const result = await upvoteFeed({ id: feed.id })
      if (!result.status) {
        ToastAndroid.show(result?.messages || "Error Upvote", ToastAndroid.SHORT);
        return
      }

      ToastAndroid.show("Success Upvote", ToastAndroid.SHORT)
    });
  }, [handlePress, upvoteFeed, feed.id, user?.username]);

  return (
    <View style={styles['item-container']}>
      <View style={styles['item-header']}>
        <View style={styles['item-header-avatar']}>
          <Avatar source={feed.avatarUrl} size={'large'} />
        </View>
        <View style={styles['item-header-status']}>
          <Typography size="xsmall" type="heading">
            {feed.name}
          </Typography>
          {feed.headline && (
            <Typography size="small">{feed.headline}</Typography>
          )}
          <Typography size="xsmall">{feed.createdAt}</Typography>
        </View>
        <TouchableOpacity
          style={styles['item-header-action']}
          onPress={onPressHeaderAction}>
          <Icon name="ellipsis" width={16} height={16} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onPressContent}>
        <View style={styles['item-content']}>
          <Typography type="heading">{feed.postHeader}</Typography>
          <Typography numberOfLines={4}>{feed.postContent}</Typography>
          <View style={styles['item-content-tags']}>
            <Label variant="tertiary" color="green">
              {feed.postTopic}
            </Label>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles['item-footer']}>
        <FeedActionButton
          data={[
            {
              icon: 'arrow-up',
              count: feed.postUpvote,
              iconPress: onPressUpvote,
            },
            { icon: 'arrow-down' },
          ]}
        />
        <FeedActionButton
          data={[{ icon: 'comment', count: feed.postComment }]}
        />
        <FeedActionButton
          data={[{ icon: 'retweet', count: feed.postComment }]}
        />
      </View>
    </View>
  );
};

export default memo(Feed);

const styles = StyleSheet.create({
  'item-container': {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral100,
  },
  'item-header': { flexDirection: 'row' },
  'item-header-avatar': {},
  'item-header-status': { flex: 1, marginLeft: 12 },
  'item-header-action': { alignSelf: 'flex-start', padding: 4 },
  'item-content': { marginTop: 12 },
  'item-content-tags': { flexDirection: 'row', marginTop: 12 },
  'item-footer': {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
    flexWrap: 'wrap',
  },
});
