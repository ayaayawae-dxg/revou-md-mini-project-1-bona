import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React from 'react';
import { COLORS, FONT_SIZE } from '@constant';

type TypographyProps = {
  type?: 'heading' | 'paragraph' | 'special';
  size?:
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall';
  children: React.ReactNode;
  style?: TextStyle
};

const Typography: React.FC<TypographyProps> = ({
  type = 'paragraph',
  size = 'medium',
  children,
  style,
}) => {
  const getStyleByTypeAndSize = () => {
    return styles[`${type}-${size}`];
  };

  return <Text style={[getStyleByTypeAndSize(), style]}>{children}</Text>;
};

export default Typography;

const styles = StyleSheet.create({
  'heading-xxlarge': {
    fontSize: FONT_SIZE.headingXxLarge,
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral700,
  },
  'heading-xlarge': {
    fontSize: FONT_SIZE.headingXLarge,
    lineHeight: 32,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral700,
  },
  'heading-large': {
    fontSize: FONT_SIZE.headingLarge,
    lineHeight: 28,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral700,
  },
  'heading-medium': {
    fontSize: FONT_SIZE.headingMedium,
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral700,
  },
  'heading-small': {
    fontSize: FONT_SIZE.headingSmall,
    lineHeight: 22,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral700,
  },
  'heading-xsmall': {
    fontSize: FONT_SIZE.headingXSmall,
    lineHeight: 20,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral700,
  },
  'heading-xxsmall': {
    fontSize: FONT_SIZE.headingXxSmall,
    lineHeight: 18,
    fontFamily: 'Inter-Bold',
    color: COLORS.neutral700,
  },

  'paragraph-xxlarge': {},
  'paragraph-xlarge': {},
  'paragraph-large': {
    fontSize: FONT_SIZE.paragraphLarge,
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'paragraph-medium': {
    fontSize: FONT_SIZE.paragraphMedium,
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'paragraph-small': {
    fontSize: FONT_SIZE.paragraphSmall,
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'paragraph-xsmall': {
    fontSize: FONT_SIZE.paragraphXSmall,
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'paragraph-xxsmall': {},

  'special-xxlarge': {},
  'special-xlarge': {},
  'special-large': {
    fontSize: FONT_SIZE.specialLarge,
    fontStyle: 'italic',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'special-medium': {
    fontSize: FONT_SIZE.specialMedium,
    fontStyle: 'italic',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'special-small': {
    fontSize: FONT_SIZE.specialSmall,
    fontStyle: 'italic',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'special-xsmall': {
    fontSize: FONT_SIZE.specialXSmall,
    fontStyle: 'italic',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
  'special-xxsmall': {
    fontSize: FONT_SIZE.specialXxSmall,
    fontStyle: 'italic',
    lineHeight: 12,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
  },
});
