import { StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';

import { EyeIcon, EyeSlashIcon, HeartIcon } from '@assets/icons';
import { COLORS } from '@constant';

type IconName = 'heart' | 'eye' | 'eye-slash';

const IconMap: Record<IconName, React.FC<SvgProps>> = {
  heart: HeartIcon,
  eye: EyeIcon,
  'eye-slash': EyeSlashIcon,
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
