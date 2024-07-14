import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { COLORS } from '@constant';
import { Avatar, Icon, Typography } from '@components/atom';
import { TextField } from '@components/molecules';
import { useAuth } from '@hooks';

const PostFeed = () => {
  const { user } = useAuth();

  return (
    <View style={styles['post-feed-container']}>
      <View style={styles['post-feed-card']}>
        <View style={styles['post-feed-card-header']}>
          <Avatar size="large" source={user ? user.avatar_url : null} />
          <View style={styles['input-wrapper']}>
            <TextField
              state="default-no-label"
              placeholder="Apa yang ingin kamu tanyakan?"
            />
          </View>
        </View>

        <View style={styles['post-feed-card-footer']}>
          <View style={styles['post-feed-card-footer-item']}>
            <Icon
              name="question"
              width={16}
              height={16}
              fill={COLORS.yellow600}
            />
            <Typography type="heading" size="xsmall">
              Pertanyaan
            </Typography>
          </View>

          <View style={styles['post-feed-card-footer-divider']}></View>

          <View style={styles['post-feed-card-footer-item']}>
            <Icon name="plus" width={16} height={16} fill={COLORS.green600} />
            <Typography type="heading" size="xsmall">
              Post
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostFeed;

const styles = StyleSheet.create({
  'post-feed-container': {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  'post-feed-card': {
    backgroundColor: COLORS.neutral100,
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
    borderRadius: 16,
  },
  'post-feed-card-header': {
    flexDirection: 'row',
  },
  'input-wrapper': {
    flex: 1,
    marginLeft: 8,
  },
  'post-feed-card-footer': {
    flexDirection: 'row',
    marginTop: 16,
  },
  'post-feed-card-footer-item': {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  'post-feed-card-footer-divider': {
    borderWidth: 1,
    borderColor: COLORS.neutral300,
  },
});
