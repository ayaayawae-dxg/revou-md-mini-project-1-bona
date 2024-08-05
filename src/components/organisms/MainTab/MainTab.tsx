import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { COLORS } from '@constant';
import { Icon, IconName, Typography, TypographyProps } from '@components/atom';
import { MainTabHint } from '@components/molecules';
import { useAuth } from '@store';
import { redirectOnUnauthorized } from '@utils/helper';

type TabIconProps = {
  name: string;
  icon: IconName;
  isActionProtected?: boolean;
};

type GetTextTypeAndSizeProps = () => TypographyProps;

const TabsIcon: TabIconProps[] = [
  { name: 'Home', icon: 'home' },
  { name: 'Profile', icon: 'user', isActionProtected: true },
];

const MainTab: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const user = useAuth(state => state.user);

  return (
    <>
      <MainTabHint />

      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          const iconName =
            TabsIcon.find(v => v.name === route.name)?.icon || 'question';

          const isProtected = TabsIcon.find(v => v.name === route.name)?.isActionProtected === true;

          const label: any =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const isAllowed = isProtected ? redirectOnUnauthorized(user, navigation) : true
            if (!isAllowed) return

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const getTextTypeAndSize: GetTextTypeAndSizeProps = () => {
            if (isFocused) {
              return { type: 'heading', size: 'xsmall' };
            }

            return { type: 'paragraph', size: 'small' };
          };

          const getTextStyle = () => {
            if (isFocused) {
              return {
                color: styles.active.color,
              };
            }

            return { color: COLORS.neutral400 };
          };

          const getIconStyle = () => {
            if (isFocused) {
              return {
                color: styles.active.color,
              };
            }

            return { color: COLORS.neutral400 };
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab]}
              key={index}>
              <Icon name={iconName} fill={getIconStyle().color} />

              <Typography
                {...getTextTypeAndSize()}
                style={[getTextStyle(), styles.text]}>
                {label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

export default MainTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 89,
    backgroundColor: COLORS.neutral100,
    borderTopColor: COLORS.neutral300,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 32,
  },
  text: {
    textAlign: 'center',
  },
  active: {
    color: COLORS.purple600,
  },
});
