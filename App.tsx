import React from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/id';

import { AppNavigation } from '@navigation';
import { AuthProvider } from '@hooks';

const App: React.FC = () => {
  moment.locale('id')

  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
