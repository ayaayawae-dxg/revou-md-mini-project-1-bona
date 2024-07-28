import axios, { AxiosResponse } from 'axios';

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
  axios.get(`https://develop.investly.id/api/social/v1/public/username/${username}`);

export default {
  login,
  register,
  checkEmail,
  getProfileByUsername
};
