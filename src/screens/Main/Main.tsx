import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home, Profile } from '@screens';
import { Appbar } from '@components/molecules';
import { MainTab } from '@components/organisms';
import { RootStackScreenProps } from '@navigation';
import { useAuth } from '@store';

type MainProps = RootStackScreenProps<'Main'>

const Tab = createBottomTabNavigator();

const Main: React.FC<MainProps> = () => {
  const getUserProfile = useAuth(state => state.getUserProfile)

  useEffect(() => {
    getUserProfile()
  }, [getUserProfile])

  return (
    <Tab.Navigator tabBar={(props) => <MainTab {...props} />}>
      <Tab.Screen name="Home" component={Home} options={{ header: Appbar }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
