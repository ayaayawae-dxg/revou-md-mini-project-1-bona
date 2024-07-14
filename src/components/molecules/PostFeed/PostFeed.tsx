import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '@constant';
import { Avatar, Icon, Typography } from '@components/atom';
import { TextField } from '@components/molecules';
import { useAuth } from '@hooks';
import { redirectOnUnauthorized } from '@utils/helper';

const PostFeed = () => {
  const { user } = useAuth();
  const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation();

  const onPressText = () => {
    const isAllowed = redirectOnUnauthorized(user, navigation)
    if (!isAllowed) return
  }

  const onPressPertanyaan = () => {
    const isAllowed = redirectOnUnauthorized(user, navigation)
    if (!isAllowed) return
  }

  const onPressAddPost = () => {
    const isAllowed = redirectOnUnauthorized(user, navigation)
    if (!isAllowed) return
  }

  return (
    <View style={styles['post-feed-container']}>
      <View style={styles['post-feed-card']}>
        <View style={styles['post-feed-card-header']}>
          <Avatar size="large" source={user ? user.avatar_url : null} />
          <TouchableOpacity style={styles['input-wrapper']} onPress={onPressText}>
            <TextField
              state="default-no-label"
              placeholder="Apa yang ingin kamu tanyakan?"
              isActionProtected={user ? false : true}
            />
          </TouchableOpacity>
        </View>

        <View style={styles['post-feed-card-footer']}>
          <View style={styles['post-feed-card-footer-item']}>
            <TouchableOpacity onPress={onPressPertanyaan}>
              <View style={styles['post-feed-card-footer-item-wrapper']}>
                <View style={styles['post-feed-card-footer-item-icon']}>
                  <Icon
                    name="question"
                    width={16}
                    height={16}
                    fill={COLORS.yellow600}
                  />
                </View>
                <View style={styles['post-feed-card-footer-item-text']}>
                  <Typography type="heading" size="xsmall">
                    Pertanyaan
                  </Typography>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles['post-feed-card-footer-divider']}></View>

          <View style={styles['post-feed-card-footer-item']}>
            <TouchableOpacity onPress={onPressAddPost}>
              <View style={styles['post-feed-card-footer-item-wrapper']}>
                <View style={styles['post-feed-card-footer-item-icon']}>
                  <Icon name="plus" width={16} height={16} fill={COLORS.green600} />
                </View>
                <View style={styles['post-feed-card-footer-item-text']}>
                  <Typography type="heading" size="xsmall">
                    Post
                  </Typography>
                </View>
              </View>
            </TouchableOpacity>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  'post-feed-card-footer-item-wrapper': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  'post-feed-card-footer-item-icon': {
  },
  'post-feed-card-footer-item-text': {
  },
  'post-feed-card-footer-divider': {
    borderWidth: 1,
    borderColor: COLORS.neutral300,
  },
});
