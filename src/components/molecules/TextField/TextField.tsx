import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Icon, Typography } from '@components/atom';
import { COLORS, FONT_SIZE } from '@constant';

type TextFieldProps = {
  state?: 'default' | 'positive' | 'negative' | 'default-no-label' | 'disabled';
  type?: 'text' | 'password';
  placeholder?: string;
  label?: string;
  message?: string;
};

const TextField: React.FC<TextFieldProps> = ({
  state = 'default',
  type = 'text',
  placeholder = 'Placeholder',
  label = 'Label',
  message = 'message',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const getStyleByState = () => {
    if (isFocused) {
      return styles.inputTextContainerFocused
    }

    switch (state) {
      case 'default':
      case 'default-no-label':
        return styles.inputTextContainerDefault;
      case 'positive':
        return styles.inputTextContainerPositive;
      case 'negative':
        return styles.inputTextContainerNegative;
    }
  };

  const getTextStyleByState = () => {
    switch (state) {
      case 'disabled':
        return styles.inputTextDisabled;
      default:
        return;
    }
  };

  return (
    <View>
      <Typography
        type="heading"
        size="small"
        style={{ ...styles.label, ...getTextStyleByState() }}>
        {label}
      </Typography>
      <View style={[styles.inputTextContainer, getStyleByState()]}>
        <TextInput
          secureTextEntry={type === 'password' && isVisible === false}
          editable={state !== 'disabled'}
          placeholderTextColor={COLORS.neutral500}
          placeholder={placeholder}
          style={[styles.inputText]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {type === 'password' && (
          <TouchableOpacity onPress={() => setIsVisible(prev => !prev)}>
            <Icon name={isVisible ? 'eye-slash' : 'eye'} width={16} height={16} />
          </TouchableOpacity>
        )}
      </View>
      {state === 'negative' && (
        <Typography style={styles.message} type="paragraph" size="small">
          {message}
        </Typography>
      )}
    </View>
  );
};

export default TextField;

const styles = StyleSheet.create({
  message: { color: COLORS.red500 },
  label: { paddingBottom: 8 },
  inputText: {
    padding: 0,
    fontSize: FONT_SIZE.paragraphMedium,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
    flex: 1
  },
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  inputTextContainerDefault: {
    borderColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral200,
  },
  inputTextContainerPositive: {
    borderColor: COLORS.green500,
    backgroundColor: COLORS.green100,
  },
  inputTextContainerNegative: {
    borderColor: COLORS.red500,
    backgroundColor: COLORS.red100,
  },
  inputTextContainerFocused: {
    borderColor: COLORS.purple500,
    backgroundColor: COLORS.purple100,
  },
  inputTextContainerDisabled: {
    borderColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral200,
  },
  inputTextDisabled: {
    color: COLORS.neutral400,
  },
});
