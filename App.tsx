import React from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/id';

import { AppNavigation } from '@navigation';
import { AuthProvider, FeedProvider } from '@hooks';

const App: React.FC = () => {
  moment.locale('id')
  
  return (
    <AuthProvider>
      <FeedProvider>
        <AppNavigation />
      </FeedProvider>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
