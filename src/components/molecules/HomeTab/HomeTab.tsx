import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { COLORS } from '@constant';
import { Typography } from '@components/atom';

const HomeTab: React.FC<MaterialTopTabBarProps> = ({
  state,
  descriptors,
  navigation,
  position,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
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

        const getActiveStyle = () => {
          if (isFocused) {
            return styles.active;
          }
        };

        const getTextStyle = () => {
          if (isFocused) {
            return {
              color: styles.active.borderBottomColor,
            };
          }

          return { color: COLORS.neutral700 };
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[getActiveStyle(), styles.tab]}
            key={index}>
            <Typography type="heading" size="small" style={[getTextStyle(), styles.text]}>
              {label}
            </Typography>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HomeTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral300,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8
  },
  text: {
    textAlign: 'center',
  },
  active: {
    borderBottomColor: COLORS.purple600,
    borderBottomWidth: 2,
  },
});
