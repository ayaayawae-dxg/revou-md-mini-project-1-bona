import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

type FeedContextType = {
  feedData: FeedProps[];
  setFeedData: Dispatch<SetStateAction<FeedProps[]>>;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

const useFeed = (): FeedContextType => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error('useFeed must be used within an FeedProvider');
  }
  return context;
};

const FeedProvider = (props: { children: ReactNode }): ReactElement => {
  const [feedData, setFeedData] = useState<FeedProps[]>([]);

  return <FeedContext.Provider {...props} value={{ feedData, setFeedData }} />;
};

export { FeedProvider, useFeed };
