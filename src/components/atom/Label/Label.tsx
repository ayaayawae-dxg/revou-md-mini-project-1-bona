import React from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';

import { Typography } from '@components/atom';
import { COLORS } from '@constant';

type LabelProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  color?: 'purple' | 'blue' | 'green' | 'red' | 'neutral';
  children: React.ReactNode;
  style?: TextStyle;
};

const Label: React.FC<LabelProps> = ({
  variant = 'tertiary',
  color = 'neutral',
  children = 'Label',
  style,
}) => {
  const getContainerStyleByVariantAndColor = () => {
    return styles[`${variant}-${color}`];
  };

  const getTextStyleByVariantAndColor = () => {
    return {
      color: styles[`${variant}-${color}`].color,
    };
  };

  return (
    <View style={[styles.container, getContainerStyleByVariantAndColor()]}>
      <Typography
        type="heading"
        size="xsmall"
        style={{ ...getTextStyleByVariantAndColor() }}>
        {children}
      </Typography>
    </View>
  );
};

export default Label;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'center',
  },
  'primary-purple': {
    backgroundColor: COLORS.purple600,
    color: COLORS.neutral100,
  },
  'primary-blue': {
    backgroundColor: COLORS.blue600,
    color: COLORS.neutral100,
  },
  'primary-green': {
    backgroundColor: COLORS.green600,
    color: COLORS.neutral100,
  },
  'primary-red': {
    backgroundColor: COLORS.red600,
    color: COLORS.neutral100,
  },
  'primary-neutral': {
    backgroundColor: COLORS.neutral600,
    color: COLORS.neutral100,
  },
  'secondary-purple': {
    backgroundColor: COLORS.neutral100,
    color: COLORS.purple600,
    borderWidth: 1,
    borderColor: COLORS.purple300,
  },
  'secondary-blue': {
    backgroundColor: COLORS.neutral100,
    color: COLORS.blue600,
    borderWidth: 1,
    borderColor: COLORS.blue300,
  },
  'secondary-green': {
    backgroundColor: COLORS.neutral100,
    color: COLORS.green600,
    borderWidth: 1,
    borderColor: COLORS.green300,
  },
  'secondary-red': {
    backgroundColor: COLORS.neutral100,
    color: COLORS.red600,
    borderWidth: 1,
    borderColor: COLORS.red300,
  },
  'secondary-neutral': {
    backgroundColor: COLORS.neutral100,
    color: COLORS.neutral600,
    borderWidth: 1,
    borderColor: COLORS.neutral300,
  },
  'tertiary-purple': {
    backgroundColor: COLORS.purple100,
    color: COLORS.purple600,
  },
  'tertiary-blue': {
    backgroundColor: COLORS.blue100,
    color: COLORS.blue600,
  },
  'tertiary-green': {
    backgroundColor: COLORS.green100,
    color: COLORS.green600,
  },
  'tertiary-red': {
    backgroundColor: COLORS.red100,
    color: COLORS.red600,
  },
  'tertiary-neutral': {
    backgroundColor: COLORS.neutral300,
    color: COLORS.neutral600,
  },
});
