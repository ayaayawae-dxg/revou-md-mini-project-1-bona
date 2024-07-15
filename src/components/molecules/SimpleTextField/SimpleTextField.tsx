import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';

import { Icon, Typography } from '@components/atom';
import { COLORS, FONT_SIZE } from '@constant';

type SimpleTextFieldProps = {
  type?: 'heading' | 'paragraph';
  size?:
  | 'xxlarge'
  | 'xlarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'xsmall'
  | 'xxsmall';
  placeholder?: string;
  label?: string;
  style?: TextStyle
};

const SimpleTextField: React.FC<SimpleTextFieldProps & TextInputProps> = ({
  type = 'paragraph',
  size = 'medium',
  placeholder = 'Placeholder',
  onBlur,
  onChangeText,
  value,
  style
}) => {
  const getStyleBySize = () => {
    return styles[`${type}-${size}`];
  };

  return (
    <TextInput
      placeholderTextColor={COLORS.neutral400}
      placeholder={placeholder}
      style={[styles['input-text'], getStyleBySize(), style]}
      onBlur={onBlur}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

export default SimpleTextField;

const styles = StyleSheet.create({
  'input-text': {
    color: COLORS.neutral700,
    padding: 0
  },
  'heading-xxlarge': {
    fontSize: FONT_SIZE.headingXxLarge,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
  },
  'heading-xlarge': {
    fontSize: FONT_SIZE.headingXLarge,
    lineHeight: 32,
    fontFamily: 'Inter-Bold',
  },
  'heading-large': {
    fontSize: FONT_SIZE.headingLarge,
    lineHeight: 28,
    fontFamily: 'Inter-Bold',
  },
  'heading-medium': {
    fontSize: FONT_SIZE.headingMedium,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
  },
  'heading-small': {
    fontSize: FONT_SIZE.headingSmall,
    lineHeight: 22,
    fontFamily: 'Inter-Bold',
  },
  'heading-xsmall': {
    fontSize: FONT_SIZE.headingXSmall,
    lineHeight: 20,
    fontFamily: 'Inter-Bold',
  },
  'heading-xxsmall': {
    fontSize: FONT_SIZE.headingXxSmall,
    lineHeight: 18,
    fontFamily: 'Inter-Bold',
  },

  'paragraph-xxlarge': {},
  'paragraph-xlarge': {},
  'paragraph-large': {
    fontSize: FONT_SIZE.paragraphLarge,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  'paragraph-medium': {
    fontSize: FONT_SIZE.paragraphMedium,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  'paragraph-small': {
    fontSize: FONT_SIZE.paragraphSmall,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  'paragraph-xsmall': {
    fontSize: FONT_SIZE.paragraphXSmall,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  'paragraph-xxsmall': {},
})
