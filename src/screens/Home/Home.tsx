import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { COLORS } from '@constant';
import { HomeTab, PostFeed } from '@components/molecules';
import { HomeNew, HomeTrending } from '@screens';
import { generateHomeData } from '@utils/helper';
import { useFeed } from '@hooks';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  const { feedData, setFeedData } = useFeed();

  useEffect(() => {
    setFeedData(generateHomeData());
  }, []);

  return (
    <View style={styles['container']}>
      <PostFeed />

      <View style={styles.content}>
        <Tab.Navigator tabBar={props => <HomeTab {...props} />}>
          <Tab.Screen
            name="HomeTrending"
            options={{ tabBarLabel: 'Trending' }}
            component={HomeTrending}
          />
          <Tab.Screen
            name="HomeNew"
            options={{ tabBarLabel: 'Terbaru' }}
            component={HomeNew}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    backgroundColor: COLORS.neutral100,
    flex: 1,
  },
});
