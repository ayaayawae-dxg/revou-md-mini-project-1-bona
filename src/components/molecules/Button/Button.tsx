import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Typography } from '@components/atom';
import { COLORS } from '@constant';

type ButtonProps = {
  disabled?: boolean;
  type?: 'text-only' | 'icon-left' | 'icon-right' | 'icon-only';
  size?: 'large' | 'medium' | 'small';
  variant?: 'primary' | 'outline' | 'tertiary' | 'link';
  children: React.ReactNode;
  style?: TextStyle;
  icon?: React.ReactElement;
  onPress?: () => void
};

const Button: React.FC<ButtonProps> = ({
  disabled = false,
  type = 'text-only',
  size = 'medium',
  variant = 'primary',
  children,
  icon,
  onPress,
}) => {
  const getTextSize = () => {
    return size === 'large' ? 'medium' : size === 'medium' ? 'small' : 'xsmall';
  };

  const getStyleBySizeAndVariant = () => {
    return styles[`${size}-${variant}`];
  };

  const getStyleByVariantAndDisabled = () => {
    const disabledText = disabled ? 'disabled' : 'enabled';
    return styles[`${variant}-${disabledText}`];
  };

  const getTextStyleByVariantAndDisabled = () => {
    const disabledText = disabled ? 'disabled' : 'enabled';
    return styles[`text-${variant}-${disabledText}`];
  };

  const getStyleByType = () => {
    return type === "icon-only" ? { alignSelf: 'center' } : null
  }

  const getIconSizeByType = () => {
    if (type === "icon-only") {
      return size === 'large'
        ? { width: 24, height: 24 }
        : size === 'medium'
          ? { width: 20, height: 20 }
          : { width: 16, height: 16 };
    }

    return size === 'large'
      ? { width: 20, height: 20 }
      : size === 'medium'
        ? { width: 16, height: 16 }
        : { width: 12, height: 12 };
  };

  const Icon = icon
    ? React.cloneElement(icon, {
      ...getIconSizeByType(),
      color: getTextStyleByVariantAndDisabled().color,
    })
    : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        getStyleBySizeAndVariant(),
        getStyleByVariantAndDisabled(),
        getStyleByType(),
      ]}>
      {type === 'icon-only' ? (
        <>
          {Icon}
        </>
      ) : (
        <>
          {type === 'icon-left' && Icon}
          <Typography
            type="heading"
            size={getTextSize()}
            style={[{ paddingHorizontal: 8 }, getTextStyleByVariantAndDisabled()]}>
            {children}
          </Typography>
          {type === 'icon-right' && Icon}
        </>
      )}

    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  'large-primary': {
    padding: 12,
  },
  'large-outline': {
    padding: 12,
  },
  'large-tertiary': {
    padding: 12,
  },
  'large-link': {},

  'medium-primary': {
    padding: 9,
  },
  'medium-outline': {
    padding: 9,
  },
  'medium-tertiary': {
    padding: 9,
  },
  'medium-link': {},

  'small-primary': {
    padding: 6,
  },
  'small-outline': {
    padding: 6,
  },
  'small-tertiary': {
    padding: 6,
  },
  'small-link': {},

  'primary-enabled': {
    backgroundColor: COLORS.purple600,
  },
  'primary-disabled': {
    backgroundColor: COLORS.neutral400,
  },

  'outline-enabled': {
    borderWidth: 1,
    borderColor: COLORS.purple600,
  },
  'outline-disabled': {
    borderWidth: 1,
    borderColor: COLORS.neutral400,
  },

  'tertiary-enabled': {
    backgroundColor: COLORS.purple100,
  },
  'tertiary-disabled': {
    backgroundColor: COLORS.neutral400,
  },

  'link-enabled': {},
  'link-disabled': {},

  'text-primary-enabled': {
    color: COLORS.neutral100,
  },
  'text-primary-disabled': {
    color: COLORS.neutral100,
  },

  'text-outline-enabled': {
    color: COLORS.purple600,
  },
  'text-outline-disabled': {
    color: COLORS.neutral400,
  },

  'text-tertiary-enabled': {
    color: COLORS.purple600,
  },
  'text-tertiary-disabled': {
    color: COLORS.neutral100,
  },

  'text-link-enabled': {
    color: COLORS.purple600,
  },
  'text-link-disabled': {
    color: COLORS.neutral400,
  },
});
