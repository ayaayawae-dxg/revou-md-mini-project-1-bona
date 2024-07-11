import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '@constant';

type DotsProps = {
  active: boolean;
};

const Dots: React.FC<DotsProps> = ({ active = false }) => {
  const getStyleByActive = () => {
    return active
      ? { backgroundColor: COLORS.purple600, width: 16 }
      : { backgroundColor: COLORS.purple100, widht: 8 };
  };

  return <View style={[styles.container, getStyleByActive()]}></View>;
};

export default Dots;

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: 8,
    borderRadius: 4
  },
});
