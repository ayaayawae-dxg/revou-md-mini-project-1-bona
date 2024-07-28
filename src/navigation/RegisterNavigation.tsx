import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';

import { RegisterStepOne, RegisterStepThree, RegisterStepTwo } from '@screens';

const RegisterStack = createNativeStackNavigator<RegisterStackParamList>();

export type RegisterStackScreenProps<T extends keyof RegisterStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<RegisterStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

const RegisterNavigation = () => {
  return (
    <RegisterStack.Navigator screenOptions={{ headerShown: false }}>
      <RegisterStack.Screen name="RegisterStep1" component={RegisterStepOne} />
      <RegisterStack.Screen name="RegisterStep2" component={RegisterStepTwo} />
      <RegisterStack.Screen name="RegisterStep3" component={RegisterStepThree} />
    </RegisterStack.Navigator>
  );
};

export default RegisterNavigation;

const styles = StyleSheet.create({});
