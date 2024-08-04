import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Typography } from '@components/atom';
import { COLORS } from '@constant';

type ProgressBarProps = {
  step: number;
  totalSteps: number;
  style: TextStyle
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  step = 1,
  totalSteps = 1,
  style,
}) => {
  const getActiveProgress = useCallback((): StyleProp<ViewStyle> => {
    const progress = (step / totalSteps) * 100;
    const isLastStep = step === totalSteps;

    return {
      width: `${progress}%`,
      borderTopLeftRadius: 12,
      borderBottomLeftRadius: 12,
      borderTopRightRadius: isLastStep ? 12 : 0,
      borderBottomRightRadius: isLastStep ? 12 : 0,
    }
  }, [step, totalSteps])

  return (
    <View style={style}>
      <Typography type='heading' size='xxsmall'>{step} dari {totalSteps}</Typography>
      <View style={styles['bar-container']}>
        <View style={styles.bar} />
        <View style={[styles['active-bar'], getActiveProgress()]} />
      </View>
    </View>
  )
}

export default memo(ProgressBar)

const styles = StyleSheet.create({
  bar: {
    height: 10,
    backgroundColor: COLORS.neutral300,
    borderRadius: 12,
    marginTop: 4,
  },
  'bar-container': {
    position: 'relative',
  },
  'active-bar': {
    position: 'absolute',
    left: 0,
    backgroundColor: COLORS.purple600,
    height: 10,
    marginTop: 4,
  }
})