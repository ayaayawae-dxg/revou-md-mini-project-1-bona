import { GetTopicsResponse, investlyServices } from '@services';
import { AxiosError } from 'axios';
import { create } from 'zustand';

type UseRegisterState = {
  email: string;
  password: string;
  name: string;
  username: string;
  favoriteTopics: string[];

  isLoading: boolean;

  topicList: GetTopicsResponse[];
  selectedTopics: string[];

  setStepOne: (data: { email: string; password: string }) => void;
  setStepTwo: (data: { name: string; username: string }) => void;
  setStepThree: (data: { favoriteTopics: string[] }) => void;
  reset: () => void;
  selectTopic: (id: string) => void;
  fetchTopicList: () => Promise<BaseResponse>;
  registerUser: () => Promise<BaseResponse>;
  validateEmail: (email: string) => Promise<BaseResponse>;
};

const useRegister = create<UseRegisterState>((set, get) => ({
  email: '',
  password: '',
  name: '',
  username: '',
  favoriteTopics: [],

  isLoading: false,
  topicList: [],
  selectedTopics: [],

  setStepOne: data => set(data),
  setStepTwo: data => set(data),
  setStepThree: data => set(data),
  reset: () =>
    set({
      email: '',
      password: '',
      name: '',
      username: '',
      favoriteTopics: [],
    }),
  selectTopic: (id: string) => {
    set(state => {
      const index = state.selectedTopics.indexOf(id);
      if (index > -1) {
        return {
          selectedTopics: [
            ...state.selectedTopics.slice(0, index),
            ...state.selectedTopics.slice(index + 1),
          ],
        };
      } else if (state.selectedTopics.length < 3) {
        return { selectedTopics: [...state.selectedTopics, id] };
      }

      return {};
    });
  },
  fetchTopicList: async () => {
    set({ isLoading: true });
    try {
      const response = await investlyServices.getTopics();
      set({ topicList: response.data.data });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    } finally {
      set({ isLoading: false });
    }
  },
  registerUser: async () => {
    set({ isLoading: true });
    try {
      const payload = {
        email: get().email,
        password: get().password,
        username: get().username,
        name: get().name,
        favorite_topic_ids: get().favoriteTopics,
      };

      const response = await investlyServices.register(payload);
      return response.data;

      // {
      //   data: {
      //     access_token:
      //       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjI1MzExNzMsImlhdCI6MTcyMjUyNzU3MywiaXNzIjoiaW52ZXN0bHkiLCJuYmYiOjE3MjI1Mjc1NzMsInN1YiI6ImZmOTI3Y2MzLWFlMzMtNDg2Mi04NGMwLTI0ZTYyZjBiZmYwYyJ9.IiugzEjVLNDSA_6UqQ_o9Pxqm4m8Ae8_rTVhKEQ2MV4',
      //     expired_at: '2024-08-01T16:52:54Z',
      //     is_verified: true,
      //     refresh_token: 'ipSIcfKjpyRMtmOUxzcjFxdDceVQkumwqzDGENwATfUdBSSc',
      //   },
      //   messages: 'Berhasil register',
      //   status: true,
      // }
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    } finally {
      set({ isLoading: false });
    }
  },
  validateEmail: async (email) => {
    try {
      const response = await investlyServices.checkEmail({ email })
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    }
  }
}));

export default useRegister;
