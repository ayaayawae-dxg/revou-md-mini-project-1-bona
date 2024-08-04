import React, { useCallback } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import _ from 'lodash';

import { Button, ProgressBar, TextField } from '@components/molecules';
import { Icon, Typography } from '@components/atom';
import { COLORS } from '@constant';
import { investlyServices } from '@services';
import { RegisterStackScreenProps } from '@navigation';
import { useRegister } from '@store';

type RegisterStepTwoProps = RegisterStackScreenProps<'RegisterStep2'>;

type FormData = {
  name: string;
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
  name: z
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
  const setStepTwo = useRegister(state => state.setStepTwo);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      username: '',
    },
    mode: 'all',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = useCallback(
    (data: FormData) => {
      setStepTwo({ name: data.name, username: data.username });
      navigation.navigate('RegisterStep3');
    },
    [navigation, setStepTwo],
  );

  const getInputState = useCallback(
    (name: keyof FormData) => {
      if (errors[name]) return 'negative';
      if (dirtyFields[name]) return 'positive';
    },
    [errors, dirtyFields],
  );

  const onBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <View style={styles['container']}>
      <View>
        <View style={styles['header-action']}>
          <View style={styles['header-action-left']}>
            <TouchableOpacity onPress={onBack}>
              <Icon name="chevron-left" width={20} height={20} />
            </TouchableOpacity>
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
              state={getInputState('name')}
              placeholder="Nama"
              label="Nama"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              message={errors.name?.message}
            />
          )}
          name="name"
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

      <View style={styles.footer}>
        <ProgressBar step={2} totalSteps={3} style={styles['progress-bar']} />
        <Button
          disabled={!isValid || isSubmitting}
          style={styles['button-register']}
          onPress={handleSubmit(onSubmit)}>
          {isSubmitting ? <ActivityIndicator /> : 'Selanjutnya'}
        </Button>
      </View>
    </View>
  );
};

export default RegisterStepTwo;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral100 },
  flex: { flex: 1 },
  'header-action-left': { flex: 1, alignItems: 'flex-start' },
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
    marginTop: 20,
  },
  form: {
    marginHorizontal: 24,
    gap: 16,
    marginTop: 28,
  },
  'error-message': {
    color: COLORS.red500,
    marginTop: 8,
  },
  footer: {},
  'progress-bar': {
    marginHorizontal: 24,
    marginTop: 8,
  },
  'button-register': {
    marginHorizontal: 24,
    marginBottom: 32,
    marginTop: 12,
  },
});
