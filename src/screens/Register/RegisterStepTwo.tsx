import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';

import { Button, TextField } from '@components/molecules';
import { Icon, Typography } from '@components/atom';
import { COLORS } from '@constant';
import { investlyServices } from '@services';
import { RegisterStackScreenProps } from '@navigation';

type RegisterStepTwoProps = RegisterStackScreenProps<'RegisterStep2'>;

type FormData = {
  nama: string;
  username: string;
};

const checkUsername = _.debounce(
  (username: string, callback: (result: boolean) => void) => {
    investlyServices
      .getProfileByUsername({ username })
      .then(response => {
        const { status } = response.data;
        callback(status ? false : true);
      })
      .catch(error => {
        const { status } = error.response.data;
        callback(!status ? true : false);
      });
  },
  500,
);

const registerSchema: ZodType<FormData> = z.object({
  nama: z
    .string()
    .min(1, 'Nama harus diisi')
    .min(3, 'Nama harus mengandung minimal 3 karakter')
    .max(254),
  username: z
    .string()
    .min(1, 'Username harus diisi')
    .max(254)
    .refine(async username => {
      const isUsernameValid = await new Promise(resolve => {
        checkUsername(username, resolve);
      });
      return isUsernameValid;
    }, 'Username telah terpakai, gunakan username lain'),
});

const RegisterStepTwo: React.FC<RegisterStepTwoProps> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      nama: '',
      username: '',
    },
    mode: 'all',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    navigation.reset({ routes: [{ name: 'RegisterStep3' }] });
  };

  const getInputState = (name: keyof FormData) => {
    if (errors[name]) {
      return 'negative';
    }

    if (dirtyFields[name]) {
      return 'positive';
    }
  };

  const onBack = () => navigation.goBack();

  const onMasuk = () => navigation.navigate('Login');

  return (
    <View style={styles['container']}>
      <View>
        <View style={styles['header-action']}>
          <View style={styles['header-action-left']}>
            <TouchableOpacity onPress={onBack}>
              <Icon name="chevron-left" width={20} height={20} />
            </TouchableOpacity>
          </View>
          <View style={styles['header-action-middle']}>
            <Icon name="investly" />
          </View>
          <View style={styles['header-action-right']}>
            <Button variant="link" onPress={onMasuk}>
              Masuk
            </Button>
          </View>
        </View>
        <Typography style={styles['header-title']} type="heading" size="large">
          Tambahkan Nama & Username
        </Typography>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              state={getInputState('nama')}
              placeholder="Nama"
              label="Nama"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              message={errors.nama?.message}
            />
          )}
          name="nama"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              state={getInputState('username')}
              placeholder="Username"
              label="Username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              message={errors.username?.message}
            />
          )}
          name="username"
        />
      </View>

      <View style={styles.flex}></View>

      <Button
        disabled={!isValid || isSubmitting}
        style={styles['button-register']}
        onPress={handleSubmit(onSubmit)}>
        {isSubmitting ? <ActivityIndicator /> : 'Selanjutnya'}
      </Button>
    </View>
  );
};

export default RegisterStepTwo;

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
    marginTop: 32,
  },
  'forgot-password': {
    alignItems: 'flex-start',
    marginTop: 16,
    marginHorizontal: 24,
  },
  'button-login': {
    marginHorizontal: 20,
    marginTop: 24,
  },
  'button-register': {
    marginHorizontal: 20,
    marginBottom: 44,
  },
  'error-message': {
    color: COLORS.red500,
    marginTop: 8,
  },
});
