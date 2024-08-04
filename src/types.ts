type UserAuthProps = {
  avatar_url: string;
  email: string;
};

type RegisterStackParamList = {
  RegisterStep1: undefined;
  RegisterStep2: undefined;
  RegisterStep3: undefined;
};

type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
  FeedDetail: { id: string };
  FeedCreate: undefined;
};

type BaseResponse = {
  status: boolean;
  messages: string;
  data?: any;
  meta?: any;
}
