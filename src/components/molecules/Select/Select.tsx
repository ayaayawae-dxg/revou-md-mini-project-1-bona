import { StyleSheet, TextInputProps } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';

import { Icon, Typography } from '@components/atom';
import { COLORS, FONT_SIZE } from '@constant';

type SelectProps = {
  isLoading?: boolean;
};

const Select: React.FC<SelectProps & PickerSelectProps> = ({
  placeholder = 'Placeholder',
  onValueChange,
  value,
  isLoading = false,
  items = [],
}) => {
  return (
    <RNPickerSelect
      placeholder={{ label: placeholder, color: COLORS.neutral500 }}
      style={{ viewContainer: styles['view-container'] }}
      onValueChange={onValueChange}
      items={items}
      value={value}
    />
  );
};

export default Select;

const styles = StyleSheet.create({
  'view-container': {
    borderWidth: 1,
  },
});
