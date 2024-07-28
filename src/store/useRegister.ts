import { GetTopicsResponse, investlyServices } from '@services';
import { create } from 'zustand';

type UseRegisterState = {
  isLoading: boolean;
  topicList: GetTopicsResponse[];
  selectedTopics: string[];

  fetchTopicList: () => Promise<void>;
  selectTopic: (id: string) => void;
};

const useRegister = create<UseRegisterState>(set => ({
  isLoading: false,
  topicList: [],
  selectedTopics: [],

  fetchTopicList: async () => {
    set({ isLoading: true });
    await investlyServices
      .getTopics()
      .then(response => {
        console.log(response.data.data);
        set(state => ({ topicList: response.data.data }));
      })
      .catch(() => { })
      .finally(() => set({ isLoading: false }));
  },
  selectTopic: (id: string) => {
    set(state => {
      const isAlreadySelected = state.selectedTopics.includes(id);
      let newSelectedTopics;

      if (isAlreadySelected) {
        newSelectedTopics = state.selectedTopics.filter(
          topicId => topicId !== id,
        );
      } else {
        if (state.selectedTopics.length < 3) {
          newSelectedTopics = [...state.selectedTopics, id];
        } else {
          newSelectedTopics = state.selectedTopics
        }
      }

      return { selectedTopics: newSelectedTopics };
    });
  },
}));

export default useRegister;
