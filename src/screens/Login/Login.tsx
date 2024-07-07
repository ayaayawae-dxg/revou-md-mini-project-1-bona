import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, TextField } from '@components/molecules';
import { Icon, Typography } from '@components/atom';
import { COLORS } from '@constant';

type LoginProps = {
  navigation: any;
};

const Login: React.FC<LoginProps> = ({ navigation }) => {
  return (
    <View style={styles['container']}>
      <View>
        <View style={styles['header-action']}>
          <View style={styles['header-action-left']}>
            <Icon name="chevron-left" width={20} height={20} />
          </View>
          <View style={styles['header-action-middle']}>
            <Icon name="investly" />
          </View>
          <View style={styles['header-action-right']}>
            <Button variant="link">Lewati</Button>
          </View>
        </View>
        <Typography style={styles['header-title']} type="heading" size="large">
          Masuk ke Investly
        </Typography>
      </View>

      <View style={styles.form}>
        <TextField placeholder="Email" label="Email" />
        <TextField
          placeholder="Masukkan password"
          label="Password"
          type="password"
        />
      </View>

      <View style={styles['forgot-password']}>
        <Button variant="link">Lupa Password</Button>
      </View>

      <View style={styles.flex}></View>

      <Button
        style={styles['button-login']}
        onPress={() => {
          navigation.navigate('HomeTab');
        }}>
        Masuk
      </Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral100 },
  flex: { flex: 1 },
  'header-action-left': { flex: 1, alignItems: 'flex-start' },
  'header-action-middle': { flex: 1, alignItems: 'center' },
  'header-action-right': { flex: 1, alignItems: 'flex-end' },
  'header-action': {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginHorizontal: 24,
  },
  'header-title': {
    marginHorizontal: 24,
    textAlign: 'center',
    marginTop: 24,
  },
  form: {
    marginHorizontal: 24,
    gap: 24,
  },
  'forgot-password': {
    alignItems: 'flex-start',
    marginTop: 16,
    marginLeft: 24,
  },
  'button-login': {
    marginHorizontal: 20,
    marginBottom: 44,
  },
});
