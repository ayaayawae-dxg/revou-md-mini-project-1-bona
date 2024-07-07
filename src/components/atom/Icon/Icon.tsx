import { StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';

import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  HeartIcon,
  InvestlyIcon,
} from '@assets/icons';
import { COLORS } from '@constant';

type IconName = 'heart' | 'eye' | 'eye-slash' | 'chevron-left' | 'investly';

const IconMap: Record<IconName, React.FC<SvgProps>> = {
  heart: HeartIcon,
  eye: EyeIcon,
  'eye-slash': EyeSlashIcon,
  'chevron-left': ChevronLeftIcon,
  investly: InvestlyIcon,
};

type IconProps = {
  name: IconName;
  fill?: string;
  width?: number;
  height?: number;
};

const Icon: React.FC<IconProps> = ({
  name,
  fill = COLORS.neutral400,
  ...props
}) => {
  const IconComponent = IconMap[name];
  return <IconComponent color={fill} {...props} />;
};

export default Icon;

const styles = StyleSheet.create({});
