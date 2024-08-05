import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { COLORS } from '@constant';
import { OnboardingInvestLogo } from '@assets/images';
import { Typography } from '@components/atom';
import { Button } from '@components/molecules';
import { useAuth } from '@store';
import { redirectOnUnauthorized } from '@utils/helper';

const Profile = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();

  const logout = useAuth(state => state.logout);
  const user = useAuth(state => state.user);

  const onLogout = useCallback(() => {
    logout()
    redirectOnUnauthorized(null, navigation);
  }, [user, logout, redirectOnUnauthorized, navigation]);

  return (
    <View style={styles.container}>
      <Image source={OnboardingInvestLogo} style={styles.logo} />
      <Typography type="heading" size="xxlarge" style={styles.text}>
        Coming Soon
      </Typography>

      <Button onPress={onLogout}>Logout</Button>
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
    marginHorizontal: 20,
  },
});
