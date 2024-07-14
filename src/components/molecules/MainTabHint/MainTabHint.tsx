import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Typography } from '@components/atom';
import { COLORS } from '@constant';
import { InvestlyMascot } from '@assets/images';
import { useAuth } from '@hooks';

const MainTabHint = () => {
  const { user } = useAuth();

  if (user) return null;

  return (
    <View style={styles['container']}>
      <View style={styles['image-container']}>
        <Image source={InvestlyMascot} />
      </View>
      <View style={styles['text-container']}>
        <Typography size="small">
          Temukan inspirasi investasi,{' '}
          <Typography
            type="heading"
            size="xsmall"
            style={styles['text-highlight']}>
            Masuk Yuk!
          </Typography>
        </Typography>
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
  },
  'text-highlight': {
    color: COLORS.purple600,
  },
});
