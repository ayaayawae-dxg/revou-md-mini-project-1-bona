import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Typography } from '@components/atom';
import { useFeed } from '@hooks';

const FeedEndContent = () => {
  const { feedData } = useFeed();

  if (!feedData || feedData.length === 0) return null;

  return (
    <View style={styles.container}>
      <Typography size="small">Semua feed sudah kamu lihat 🎉</Typography>
    </View>
  );
};

export default FeedEndContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
