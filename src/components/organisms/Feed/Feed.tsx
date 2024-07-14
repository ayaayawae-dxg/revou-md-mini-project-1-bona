import React, { memo, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Avatar, Icon, Label, Typography } from '@components/atom';
import { COLORS } from '@constant';
import { FeedActionButton } from '@components/molecules';
import moment from 'moment';
import { useAuth } from '@hooks';
import { redirectOnUnauthorized } from '@utils/helper';

const Feed: React.FC<FeedProps> = feed => {
  const { user } = useAuth();
  const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation();

  const onPressContent = () => {
    const isAllowed = redirectOnUnauthorized(user, navigation)
    if (!isAllowed) return
  }

  const onPressHeaderAction = () => {
    const isAllowed = redirectOnUnauthorized(user, navigation)
    if (!isAllowed) return
  }

  const relativeTime = useMemo(() => {
    return moment(feed.created_at).startOf('minute').fromNow()
  }, [])

  return (
    <View style={styles['item-container']}>
      <View style={styles['item-header']}>
        <View style={styles['item-header-avatar']}>
          <Avatar source={feed.avatar_url} size={'large'} />
        </View>
        <View style={styles['item-header-status']}>
          <Typography size="xsmall" type="heading">
            {feed.name}
          </Typography>
          {feed.headline && (
            <Typography size="small">{feed.headline}</Typography>
          )}
          <Typography size="xsmall">
            {relativeTime}
          </Typography>
        </View>
        <TouchableOpacity style={styles['item-header-action']} onPress={onPressHeaderAction}>
          <Icon name="ellipsis" width={16} height={16} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onPressContent}>
        <View style={styles['item-content']}>
          <Typography type="heading">{feed.post_header}</Typography>
          <Typography numberOfLines={4}>{feed.post_content}</Typography>
          <View style={styles['item-content-tags']}>
            <Label variant="tertiary" color="green">
              {feed.post_topic}
            </Label>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles['item-footer']}>
        <FeedActionButton
          data={[
            { icon: 'arrow-up', count: feed.post_upvote },
            { icon: 'arrow-down' },
          ]}
        />
        <FeedActionButton
          data={[{ icon: 'comment', count: feed.post_comment }]}
        />
        <FeedActionButton
          data={[{ icon: 'retweet', count: feed.post_comment }]}
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
