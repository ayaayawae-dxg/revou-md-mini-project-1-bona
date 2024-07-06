import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import FONT_SIZE from '@constant/fontSize';
import COLORS from '@constant/colors';

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
};

const Typography: React.FC<TypographyProps> = ({
  type = 'paragraph',
  size = 'medium',
  children,
}) => {
  return <Text style={styles[`${type}-${size}`]}>{children}</Text>;
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

  'special-xxlarge': {},
  'special-xlarge': {},
  'special-large': {
    fontSize: FONT_SIZE.specialLarge,
    fontStyle: 'italic',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  'special-medium': {
    fontSize: FONT_SIZE.specialMedium,
    fontStyle: 'italic',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  'special-small': {
    fontSize: FONT_SIZE.specialSmall,
    fontStyle: 'italic',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  'special-xsmall': {
    fontSize: FONT_SIZE.specialXSmall,
    fontStyle: 'italic',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  'special-xxsmall': {
    fontSize: FONT_SIZE.specialXxSmall,
    fontStyle: 'italic',
    lineHeight: 12,
    fontFamily: 'Inter-Regular',
  },
});
