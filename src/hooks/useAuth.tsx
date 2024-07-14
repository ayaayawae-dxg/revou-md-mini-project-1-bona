import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type AuthContextType = {
  user: UserAuthProps | null;
  setUser: Dispatch<SetStateAction<UserAuthProps | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = (props: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<UserAuthProps | null>(null);

  return <AuthContext.Provider {...props} value={{ user, setUser }} />;
};

export { AuthProvider, useAuth };
