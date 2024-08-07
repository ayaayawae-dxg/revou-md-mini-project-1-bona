import { GetFeedsRequest, investlyServices } from '@services';
import { AxiosError } from 'axios';
import { UpvoteFeedRequest } from 'services/investlyServices';
import { create } from 'zustand';

export type FeedPropsAPI = {
  id: string;
  header: string;
  content: string;
  attachments: null;
  attachment_properties: null;
  repost_post_id: null;
  created_at: string;
  is_upvoted: boolean;
  is_downvoted: boolean;
  is_reposted: boolean;
  is_question_post: boolean;
  is_owned: boolean;
  total_comments: number;
  upvotes: number;
  reposts: number;
  post_type: string;
  time: string;
  topic: {
    id: string;
    label: string;
  };
  analysis: null;
  parent_post: null;
  user: {
    user_id: string;
    name: string;
    username: string;
    profile_path: string;
    profile_image_properties: null;
    bio: null;
    is_pro: boolean;
    is_premium: boolean;
    is_verified: boolean;
    created_at: string;
    total_followers: number;
    total_following: number;
    is_followed: boolean;
    pro_profile: null;
    calendly_url: null;
    favorite_topics: null;
    referral_code: null;
    headline: string | null;
    favorite_instruments: null;
  };
  poll_question: null;
};

type UseFeedState = {
  feedsTrending: FeedPropsAPI[];
  pageTrending: number;

  feedsNew: FeedPropsAPI[];
  pageNew: number;

  isLoading: boolean;

  appendPost: (data: {
    sort_by: GetFeedsRequest['sort_by'];
    data: FeedPropsAPI[];
  }) => void;
  fetchFeed: (data: GetFeedsRequest) => Promise<BaseResponse>;
  onRefreshFeed: (data: { sort_by: GetFeedsRequest['sort_by'] }) => void;
  fetchMoreFeeds: (data: { sort_by: GetFeedsRequest['sort_by'] }) => void;
  upvoteFeed: (data: UpvoteFeedRequest) => Promise<BaseResponse>;
};

const useFeed = create<UseFeedState>((set, get) => ({
  feedsTrending: [],
  pageTrending: 1,

  feedsNew: [],
  pageNew: 1,

  isLoading: false,

  appendPost: ({ sort_by, data }) => {
    if (sort_by === 'created_at')
      set(state => ({ feedsNew: [...state.feedsNew, ...data] }));
    else if (sort_by === 'engagement')
      set(state => ({ feedsTrending: [...state.feedsTrending, ...data] }));
  },

  fetchFeed: async ({ sort_by }) => {
    set({ isLoading: true });
    try {
      const response = await investlyServices.getFeeds({
        sort_by: sort_by,
        page: sort_by === 'created_at' ? get().pageNew : get().pageTrending,
        perpage: 10,
      });

      get().appendPost({ sort_by: sort_by, data: response.data.data });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    } finally {
      set({ isLoading: false });
    }
  },

  onRefreshFeed: ({ sort_by }) => {
    if (sort_by === 'created_at') {
      set({ pageNew: 1, feedsNew: [] });
    } else if (sort_by === 'engagement') {
      set({ pageTrending: 1, feedsTrending: [] });
    }

    get().fetchFeed({ sort_by });
  },

  fetchMoreFeeds: ({ sort_by }) => {
    if (sort_by === 'created_at') {
      set(state => ({ pageNew: state.pageNew + 1 }));
    } else if (sort_by === 'engagement') {
      set(state => ({ pageTrending: state.pageTrending + 1 }));
    }

    get().fetchFeed({ sort_by });
  },

  upvoteFeed: async ({ id }) => {
    const findFeedAndUpdateUpvote = (
      id: string,
      type: 'increment' | 'decrement',
      value: number = 1
    ) => {
      const updatedFeedsTrending = get().feedsTrending.map(feed =>
        feed.id === id
          ? { ...feed, upvotes: feed.upvotes + (type === 'increment' ? value : -value) }
          : feed,
      );
      const updatedFeedsNew = get().feedsNew.map(feed =>
        feed.id === id
          ? { ...feed, upvotes: feed.upvotes + (type === 'increment' ? value : -value) }
          : feed,
      );
      set({ feedsTrending: updatedFeedsTrending, feedsNew: updatedFeedsNew });
    };

    try {
      findFeedAndUpdateUpvote(id, 'increment')
      const response = await investlyServices.upvoteFeed({ id });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        findFeedAndUpdateUpvote(id, 'decrement')

        return error.response?.data;
      }
    }
  },
}));

export default useFeed;
