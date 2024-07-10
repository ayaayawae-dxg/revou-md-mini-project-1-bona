import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { Feed } from '@components/organisms';
import { generateHomeData } from '@utils/helper';
import { FeedEndContent } from '@components/molecules';

const data: FeedProps[] = generateHomeData();

const HomeTrending = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={({ item }) => {
          return <Feed key={item.id} {...item} />;
        }}
        ListFooterComponent={<FeedEndContent />}
      />
    </View>
  );
};

export default HomeTrending;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
