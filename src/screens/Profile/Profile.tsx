import React, { useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';

import { COLORS } from '@constant';
import { Button } from '@components/molecules';
import { useAuth } from '@store';
import { redirectOnUnauthorized } from '@utils/helper';

const Profile = () => {
  const navigation: NativeStackNavigationProp<RootStackParamList> =
    useNavigation();

  const logout = useAuth(state => state.logout);
  const user = useAuth(state => state.user);

  const onLogout = useCallback(async () => {
    await analytics().logEvent('click_logout', { username: user?.username, email: user?.email });

    logout()
    redirectOnUnauthorized(null, navigation);
  }, [user, logout, redirectOnUnauthorized, navigation]);

  return (
    <View style={styles.container}>
      <Button style={styles['logout-button']} size='large' onPress={onLogout}>Logout</Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
    justifyContent: 'center',
  },
  'logout-button': {
    marginHorizontal: 20
  }
});
