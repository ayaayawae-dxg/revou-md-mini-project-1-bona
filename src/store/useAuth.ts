import { encryptionServices, investlyServices, storageServices } from '@services';
import { AxiosError } from 'axios';
import { create } from 'zustand';

export type UserPropsAPI = {
  user_id: string;
  name: string;
  username: string;
  profile_path: string;
  profile_image_properties: {
    name_display: string;
    full_path: string;
    size: number;
    mime_type: string;
  };
  email: string;
  bio: string | null;
  is_pro: boolean;
  is_premium: boolean;
  is_verified: boolean;
  is_blocked: boolean;
  created_at: string;
  total_followers: number;
  total_following: number;
  is_followed: boolean;
  config: {
    user_id: string;
    is_private: boolean;
    is_share_portfolio: boolean;
    is_pin_exist: boolean;
    is_phone_verified: boolean;
    is_email_verified: boolean;
    is_generated_password: boolean;
    is_generated_profile: boolean;
  };
  pro_profile: string | null;
  calendly_url: string | null;
  favorite_topics: string[];
  referral_code: string;
  headline: string | null;
  favorite_instruments: string[] | null;
};

type UseAuthState = {
  user: UserPropsAPI | null;
  token: string | null;
  isLoading: boolean;

  setToken: (token: string) => Promise<void>;
  getToken: () => Promise<string | null | undefined>;
  logout: () => void;
  login: (data: { email: string; password: string }) => Promise<BaseResponse>;
  getUserProfile: () => Promise<BaseResponse | undefined>;
};

const useAuth = create<UseAuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,

  getToken: async () => {
    const token = get().token || storageServices.getString('access_token');
    if (token && !get().token) {
      set({ token });
    }

    const decryptedToken = await encryptionServices.decrypt(token as string)
    return decryptedToken;
  },

  setToken: async (token: string) => {
    const encryptedToken = await encryptionServices.encrypt(token)
    storageServices.set('access_token', encryptedToken);
    set({ token: encryptedToken });
  },

  login: async ({ email, password }) => {
    set({ isLoading: true });

    try {
      const response = await investlyServices.login({ email, password });
      get().setToken(response.data.data.access_token);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data;
      }
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    storageServices.delete('access_token');
    set({ user: null, token: null });
  },

  getUserProfile: async () => {
    set({ isLoading: true });

    try {
      const token = await get().getToken();
      if (!token) {
        throw new Error('No token found');
      }

      const response = await investlyServices.getProfileData({ token });
      set({ user: response.data.data });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        get().logout();
        return error.response?.data;
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useAuth;
