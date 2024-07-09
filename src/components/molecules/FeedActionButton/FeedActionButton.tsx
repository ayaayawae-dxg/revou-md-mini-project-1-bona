import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { COLORS } from '@constant';
import { Icon, IconName, Typography } from '@components/atom';

type ButtonProps = {
  icon: IconName;
  count?: number;
};

type FeedActionButtonProps = {
  data: ButtonProps[];
};

const FeedActionButton: React.FC<FeedActionButtonProps> = ({ data }) => {
  return (
    <View style={styles['item-footer-action']}>
      {data.map((item, index) => (
        <>
          {index > 0 && <View style={styles.divider}></View>}

          <View key={index} style={styles['item-footer-action-button']}>
            <Icon
              name={item.icon}
              width={16}
              height={16}
              fill={COLORS.neutral700}
            />
            <Typography size="small">{item.count}</Typography>
          </View>
        </>
      ))}
    </View>
  );
};

export default FeedActionButton;

const styles = StyleSheet.create({
  divider: { borderWidth: 1, height: 16, borderColor: COLORS.neutral400 },
  'item-footer-action': {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: COLORS.neutral200,
    borderRadius: 96,
    alignSelf: 'center',
    gap: 12,
  },
  'item-footer-action-button': {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
});
