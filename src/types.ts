type FeedProps = {
  id: string;
  avatar_url: string;
  name: string;
  headline?: string | null;
  created_at: Date;
  post_header: string;
  post_content: string;
  post_topic: string;
  post_upvote: number;
  post_downvote: number;
  post_comment: number;
};

type UserAuthProps = {
  avatar_url: string;
  email: string;
}

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Main: undefined;
  FeedDetail: FeedProps;
  FeedCreate: undefined;
};
