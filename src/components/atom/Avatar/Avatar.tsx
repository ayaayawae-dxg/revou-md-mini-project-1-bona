import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { AvatarImage } from '@assets/images';

type AvatarProps = {
  source?: string;
  size?: 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
};

const Avatar: React.FC<AvatarProps> = ({
  source = AvatarImage,
  size = 'medium',
}) => {
  const getSize = () => {
    return styles[size];
  };

  return <Image source={source} style={[styles.image, getSize()]} />;
};

export default Avatar;

const styles = StyleSheet.create({
  image: { borderRadius: 80 },
  xxlarge: { width: 64, height: 64 },
  xlarge: { width: 52, height: 52 },
  large: { width: 40, height: 40 },
  medium: { width: 32, height: 32 },
  small: { width: 24, height: 24 },
  xsmall: { width: 16, height: 16 },
});
