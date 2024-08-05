import { faker } from '@faker-js/faker';
import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserPropsAPI } from '@store';

export const generateHomeData = () => {
  const totalData = 100;

  const data = Array.from({ length: totalData }).map((v, idx) => ({
    id: faker.string.uuid(),
    avatar_url: faker.image.avatar(),
    name: faker.person.fullName(),
    headline: faker.datatype.boolean() ? faker.person.jobTitle() : null,
    created_at: faker.date.recent(),
    post_header: faker.lorem.words(),
    post_content: faker.lorem.words({ min: 5, max: 50 }),
    post_topic: faker.lorem.word(),
    post_upvote: faker.number.int({ min: 0, max: 1000 }),
    post_downvote: faker.number.int({ min: 0, max: 1000 }),
    post_comment: faker.number.int({ min: 0, max: 1000 }),
  }));

  return data;
};

export const redirectOnUnauthorized = (
  user: UserPropsAPI | null,
  navigation: NativeStackNavigationProp<RootStackParamList> | NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>,
): boolean => {
  if (!user) {
    navigation.reset({ routes: [{ name: 'Login' }] });
    return false;
  }
  return true;
};
