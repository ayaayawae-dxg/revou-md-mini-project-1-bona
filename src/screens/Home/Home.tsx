import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@constant';
import { PostFeed } from '@components/molecules';

const Home = () => {
  return (
    <View style={styles['container']}>
      <PostFeed />
      
      <View style={{ backgroundColor: COLORS.neutral100, flex: 1 }}></View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
