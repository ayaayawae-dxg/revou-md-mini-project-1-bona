import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Home, Profile } from '@screens';
import { Appbar } from '@components/molecules';
import { MainTab } from '@components/organisms';
import { useAuth } from '@hooks';

type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Tab = createBottomTabNavigator();

const Main: React.FC<MainProps> = () => {
  const { user, setUser } = useAuth()

  return (
    <Tab.Navigator tabBar={(props) => <MainTab {...props} user={user} setUser={setUser} />}>
      <Tab.Screen name="Home" component={Home} options={{ header: Appbar }} />
      <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({});
