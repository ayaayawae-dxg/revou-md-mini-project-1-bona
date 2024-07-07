import { Dimensions } from 'react-native';

export const getScreenWidth = () => {
  return Dimensions.get('screen').width;
};

export const getScreenHeight = () => {
  return Dimensions.get('screen').height;
};
