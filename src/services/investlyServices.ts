import { encryptionServices, storageServices } from '@services';
import axios, { AxiosInstance } from 'axios';
import Config from 'react-native-config';

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

export type UpvoteFeedRequest = {
  id: string;
};

export type GetFeedsRequest = {
  sort_by?: 'engagement' | 'created_at';
  page?: number;
  perpage?: number;
};

const _axios: AxiosInstance = axios.create({
  baseURL: Config.API_URL,
});

_axios.interceptors.request.use(
  async config => {
    const token = storageServices.getString('access_token');
    const decryptedToken = await encryptionServices.decrypt(token as string);
    
    if (decryptedToken) {
      config.headers.Authorization = `Bearer ${decryptedToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const login = ({ email, password }: LoginRequest) =>
  _axios.post(
    `${Config.API_URL}/api/auth/v2/login`,
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
  _axios.post(
    `/api/auth/v4/register`,
    { email, password, favorite_topic_ids, name, username },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

const checkEmail = ({ email }: CheckEmailRequest) =>
  _axios.post(
    `/api/auth/v1/email/check`,
    { email },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  );

const getProfileByUsername = ({ username }: GetProfileByUsernameRequest) =>
  _axios.get(`/api/social/v1/public/username/${username}`);

const getTopics = () => _axios.get(`/api/social/v1/public/masterdata/topic`);

const getFeeds = ({
  page = 1,
  perpage = 10,
  sort_by = 'engagement',
}: GetFeedsRequest) =>
  _axios.get(`/api/social/v2/feed`, {
    params: { page, perpage, sort_by },
  });

const getProfileData = () => _axios.get(`/api/social/v2/profile`);

const upvoteFeed = ({ id }: UpvoteFeedRequest) =>
  _axios.post(`api/social/v2/post/${id}/up-vote`);

export default {
  login,
  register,
  checkEmail,
  getProfileByUsername,
  getTopics,
  getFeeds,
  getProfileData,
  upvoteFeed,
};
