import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { COLORS } from '@constant';
import { PostFeed } from '@components/molecules';
import { HomeNew, HomeTrending } from '@screens';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <View style={styles['container']}>
      <PostFeed />

      <View style={{ backgroundColor: COLORS.neutral100, flex: 1 }}>
        <Tab.Navigator>
          <Tab.Screen name="HomeTrending" component={HomeTrending} />
          <Tab.Screen name="HomeNew" component={HomeNew} />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
