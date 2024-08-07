import { GetFeedsRequest, investlyServices } from '@services';
import { AxiosError } from 'axios';
import { create } from 'zustand';

export type TopicPropsAPI = {
  id: string;
  file: {
    name_display: string;
    full_path: string;
    size: number;
    mime_type: string;
  };
  label: string;
};

type UseTopicState = {
  topics: TopicPropsAPI[]

  isLoading: boolean;

  fetchTopic: () => Promise<BaseResponse>;
};

const useTopic = create<UseTopicState>((set, get) => ({
  topics: [],

  isLoading: false,

  fetchTopic: async () => {
    set({ isLoading: true });
    try {
      const response = await investlyServices.getTopics();
      set({ topics: response.data.data });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTopic;
