import { StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';

import { HeartIcon } from '@assets/icons';
import { COLORS } from '@constant';

type IconName = 'heart';

const IconMap: Record<IconName, React.FC<SvgProps>> = {
  heart: HeartIcon,
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
