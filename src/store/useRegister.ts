import { investlyServices } from '@services';
import { AxiosError } from 'axios';
import { create } from 'zustand';
import analytics from '@react-native-firebase/analytics';

type TopicPropsAPI = {
  id: string;
  file: {
    name_display: string;
    full_path: string;
    size: number;
    mime_type: string;
  };
  label: string;
};

type GetStepThreeAnalyticsPayloadProps = {
  email: string;
  name: string;
  username: string;
  topic_id: string;
  topic_name: string;
};

type UseRegisterState = {
  email: string;
  password: string;
  name: string;
  username: string;
  favoriteTopics: string[];

  isLoading: boolean;

  topicList: TopicPropsAPI[];
  selectedTopics: string[];

  setStepOne: (data: { email: string; password: string }) => void;
  setStepTwo: (data: { name: string; username: string }) => void;
  setStepThree: (data: { favoriteTopics: string[] }) => void;
  reset: () => void;
  selectTopic: (id: string) => void;
  fetchTopicList: () => Promise<BaseResponse>;
  registerUser: () => Promise<BaseResponse>;
  validateEmail: (email: string) => Promise<BaseResponse>;
  getStepThreeAnalyticsPayload: () => GetStepThreeAnalyticsPayloadProps;
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
      const analyticsPayload = {
        email: state.email,
        name: state.name,
        username: state.username,
        topic_id: id,
        topic_name: state.topicList.find(value => value.id === id)?.label,
      };

      if (index > -1) {
        analytics().logEvent('click_register_unselect_topic', analyticsPayload);

        return {
          selectedTopics: [
            ...state.selectedTopics.slice(0, index),
            ...state.selectedTopics.slice(index + 1),
          ],
        };
      } else if (state.selectedTopics.length < 3) {
        analytics().logEvent('click_register_select_topic', analyticsPayload);

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
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    } finally {
      set({ isLoading: false });
    }
  },
  validateEmail: async email => {
    try {
      const response = await investlyServices.checkEmail({ email });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    }
  },
  getStepThreeAnalyticsPayload: () => {
    const state = get();
    const selectedTopicsObject = state.favoriteTopics
      .map(favoriteTopicId =>
        state.topicList.find(topic => topic.id === favoriteTopicId),
      )
      .filter((topic): topic is TopicPropsAPI => topic !== undefined);

    return {
      email: get().email,
      name: get().name,
      username: get().username,
      topic_id: selectedTopicsObject.map(value => value.id.split('-')[0]).join(','),
      topic_name: selectedTopicsObject.map(value => value.label).join(','),
    };
  },
}));

export default useRegister;
