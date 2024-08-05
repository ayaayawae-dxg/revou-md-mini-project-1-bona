import React from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/id';

import { AppNavigation } from '@navigation';

const App: React.FC = () => {
  moment.locale('id')

  return (
    <AppNavigation />
  );
};

export default App;

const styles = StyleSheet.create({});
