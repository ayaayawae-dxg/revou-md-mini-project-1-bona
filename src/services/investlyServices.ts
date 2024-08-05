import axios from 'axios';

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  favorite_topic_ids: string[];
  username: string;
  name: string;
};

export type CheckEmailRequest = {
  email: string;
};

export type GetProfileByUsernameRequest = {
  username: string;
};

export type GetProfileDataRequest = {
  token: string;
};

export type GetFeedsRequest = {
  sort_by?: 'engagement' | 'created_at';
  page?: number;
  perpage?: number;
};

const login = ({ email, password }: LoginRequest) =>
  axios.post(
    'https://develop.investly.id/api/auth/v2/login',
    { email, password },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

const register = ({
  email,
  password,
  favorite_topic_ids,
  name,
  username,
}: RegisterRequest) =>
  axios.post(
    'https://develop.investly.id/api/auth/v4/register',
    { email, password, favorite_topic_ids, name, username },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

const checkEmail = ({ email }: CheckEmailRequest) =>
  axios.post(
    'https://develop.investly.id/api/auth/v1/email/check',
    { email },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

const getProfileByUsername = ({ username }: GetProfileByUsernameRequest) =>
  axios.get(
    `https://develop.investly.id/api/social/v1/public/username/${username}`,
  );

const getTopics = () =>
  axios.get(
    `https://develop.investly.id/api/social/v1/public/masterdata/topic`,
  );

const getFeeds = ({
  page = 1,
  perpage = 10,
  sort_by = 'engagement',
}: GetFeedsRequest) =>
  axios.get(`https://develop.investly.id/api/social/v2/feed`, {
    params: { page, perpage, sort_by },
  });

const getProfileData = ({ token }: GetProfileDataRequest) =>
  axios.get(`https://develop.investly.id/api/social/v2/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export default {
  login,
  register,
  checkEmail,
  getProfileByUsername,
  getTopics,
  getFeeds,
  getProfileData,
};
