import { StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';

import {
  ChevronLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  HeartIcon,
  InvestlyIcon,
  InvestlyFullIcon,
  BellIcon,
  PlusIcon,
  QuestionIcon,
  EllipsisIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CommentIcon,
  RetweetIcon,
  HomeIcon,
  UserIcon,
  PaperPlaneIcon,
} from '@assets/icons';
import { COLORS } from '@constant';

export type IconName =
  | 'heart'
  | 'eye'
  | 'eye-slash'
  | 'chevron-left'
  | 'investly'
  | 'investly-full'
  | 'bell'
  | 'plus'
  | 'question'
  | 'ellipsis'
  | 'arrow-up'
  | 'arrow-down'
  | 'comment'
  | 'retweet'
  | 'home'
  | 'user'
  | 'paper-plane';

const IconMap: Record<IconName, React.FC<SvgProps>> = {
  heart: HeartIcon,
  eye: EyeIcon,
  'eye-slash': EyeSlashIcon,
  'chevron-left': ChevronLeftIcon,
  investly: InvestlyIcon,
  'investly-full': InvestlyFullIcon,
  bell: BellIcon,
  plus: PlusIcon,
  question: QuestionIcon,
  ellipsis: EllipsisIcon,
  'arrow-up': ArrowUpIcon,
  'arrow-down': ArrowDownIcon,
  'comment': CommentIcon,
  'retweet': RetweetIcon,
  'home': HomeIcon,
  'user': UserIcon,
  'paper-plane': PaperPlaneIcon,
};

type IconProps = {
  name: IconName;
  fill?: string;
  width?: number;
  height?: number;
};

const Icon: React.FC<IconProps> = ({
  name,
  fill = COLORS.neutral400,
  ...props
}) => {
  const IconComponent = IconMap[name];
  return <IconComponent color={fill} {...props} />;
};

export default Icon;

const styles = StyleSheet.create({});
