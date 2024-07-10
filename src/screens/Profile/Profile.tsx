import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@constant';
import { OnboardingInvestLogo } from '@assets/images';
import { Typography } from '@components/atom';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image source={OnboardingInvestLogo} style={styles.logo} />
      <Typography type="heading" size="xxlarge" style={styles.text}>
        Coming Soon
      </Typography>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
    alignItems: 'center',
  },
  logo: {
    height: 240,
    width: 240,
    marginTop: 41.58,
    marginHorizontal: 60,
  },
  text: {
    marginTop: 20,
    marginHorizontal: 20
  }
});
