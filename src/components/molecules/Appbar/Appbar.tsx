import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Icon } from '@components/atom';
import { COLORS } from '@constant';
import { InvestlyFull } from '@assets/images';

const Appbar = () => {
  return (
    <View style={styles['appbar-container']}>
      <Image
        source={InvestlyFull}
        style={styles['appbar-logo']}
      />
      <Icon name="bell" width={20} height={20} fill={COLORS.purple500} />
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  'appbar-container': {
    backgroundColor: COLORS.neutral100,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral300,
    paddingHorizontal: 24,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  'appbar-logo': {
    width: 84,
    height: 20,
  },
});
