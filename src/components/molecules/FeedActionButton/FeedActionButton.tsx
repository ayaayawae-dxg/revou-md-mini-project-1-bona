import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { COLORS } from '@constant';
import { Icon, IconName, Typography } from '@components/atom';
import { redirectOnUnauthorized } from '@utils/helper';
import { useAuth } from '@store';

type ButtonProps = {
  icon: IconName;
  count?: number;
};

type FeedActionButtonProps = {
  data: ButtonProps[];
};

const FeedActionButton: React.FC<FeedActionButtonProps> = ({ data }) => {
  const user = useAuth(state => state.user);
  const navigation: NativeStackNavigationProp<RootStackParamList> = useNavigation();

  const onPressAction = () => {
    const isAllowed = redirectOnUnauthorized(user, navigation)
    if (!isAllowed) return
  }

  return (
    <View style={styles['item-footer-action']}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <View style={styles.divider}></View>}

          <TouchableOpacity key={index} style={styles['item-footer-action-button']} onPress={onPressAction}>
            <Icon
              name={item.icon}
              width={16}
              height={16}
              fill={COLORS.neutral700}
            />
            <Typography size="small">{item.count}</Typography>
          </TouchableOpacity>
        </React.Fragment>
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
