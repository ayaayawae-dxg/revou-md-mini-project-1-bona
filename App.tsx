import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Typography } from '@components/atom';
import COLORS from '@constant/colors';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>
        <Text
          style={{
            color: COLORS.blue700,
            fontSize: 100,
            fontFamily: 'Inter-Bold',
          }}>
          Ini Text Biasa
        </Text>

        <Typography>dss21323s</Typography>
        <Typography>dss21323s</Typography>
        <Typography size="large">dss21323s</Typography>
        <Typography type="heading" size="xxlarge">
          Heading/XXLarge
        </Typography>
        <Typography type="special" size="large">
          dss21323dasds
        </Typography>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
