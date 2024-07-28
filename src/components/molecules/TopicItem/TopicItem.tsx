import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo } from 'react';

import { Typography } from '@components/atom';
import { COLORS } from '@constant';

type TopicItemProps = {
  id: string;
  nameDisplay: string;
  fullPath: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

const TopicItem: React.FC<TopicItemProps> = ({
  id,
  nameDisplay,
  fullPath,
  label,
  isSelected = false,
  onPress
}) => {
  return (
    <TouchableOpacity style={styles['container']} onPress={onPress}>
      <View>
        <Image
          style={[styles['image'], isSelected && styles['selected-image']]}
          source={{ uri: fullPath.toString() }}
        />
      </View>
      <View style={styles['text-container']}>
        <Typography
          type="heading"
          size="xsmall"
          style={[styles['text'], isSelected && styles['selected-text']]}
          numberOfLines={2}>
          {label}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default memo(TopicItem);

const styles = StyleSheet.create({
  container: { flex: 1 / 3 },
  image: {
    height: 96,
    borderRadius: 8,
  },
  'selected-image': {
    borderWidth: 4,
    borderColor: COLORS.purple700,
  },
  'text-container': {
    marginTop: 4,
  },
  text: {
    textAlign: 'center',
  },
  'selected-text': {
    color: COLORS.purple700,
  },
});
