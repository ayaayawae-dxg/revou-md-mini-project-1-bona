import { faker } from '@faker-js/faker'

export const generateHomeData = () => {
  const totalData = 5;

  const data = Array.from({ length: totalData }).map((v, idx) => ({
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

  return data
};
