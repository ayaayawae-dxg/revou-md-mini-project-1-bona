import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { Typography } from '@components/atom';
import { COLORS } from '@constant';
import { InvestlyMascot } from '@assets/images';
import { useAuth } from '@hooks';
import { redirectOnUnauthorized } from '@utils/helper';

const MainTabHint = () => {
  const { user } = useAuth();
  const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation();

  if (user) return null;

  const onPressJoin = () => {
    const isAllowed = redirectOnUnauthorized(user, navigation)
    if (!isAllowed) return
  }

  return (
    <View style={styles['container']}>
      <View style={styles['image-container']}>
        <Image source={InvestlyMascot} />
      </View>
      <View style={styles['text-container']}>
        <Typography size="small">
          Temukan inspirasi investasi,
        </Typography>
        <TouchableOpacity onPress={onPressJoin}>
          <Typography
            type="heading"
            size="xsmall"
            style={styles['text-highlight']}>
            Masuk Yuk!
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainTabHint;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    backgroundColor: COLORS.purple100,
  },
  'image-container': {},
  'text-container': {
    flex: 1,
    flexDirection: 'row',
    gap: 4
  },
  'text-highlight': {
    color: COLORS.purple600,
  },
});
