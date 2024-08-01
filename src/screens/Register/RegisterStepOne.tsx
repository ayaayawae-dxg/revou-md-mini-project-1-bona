import React, { useCallback } from 'react';
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

import { Button, TextField } from '@components/molecules';
import { Icon, Typography } from '@components/atom';
import { COLORS } from '@constant';
import { RegisterStackScreenProps } from '@navigation';
import { useRegister } from '@store';

type RegisterStepOneProps = RegisterStackScreenProps<'RegisterStep1'>

type FormData = {
  email: string;
  password: string;
  confirmationPassword: string;
};

const registerSchema: ZodType<FormData> = z
  .object({
    email: z
      .string()
      .min(1, 'Email harus diisi')
      .trim()
      .max(254)
      .regex(
        /^[^\s()<>[\],;:"\\']+$/,
        `Email tidak boleh mengandung karakter spesial ( ) < > , ; : " [ ] '`,
      )
      .email('Format email tidak sesuai')
      .toLowerCase(),
    password: z
      .string()
      .min(1, 'Password harus diisi')
      .min(8, 'Password harus mengandung minimal 8 karakter')
      .max(64, 'Password harus mengandung maksimal 64 karakter')
      .regex(/[A-Z]/, 'Password harus mengandung huruf besar')
      .regex(/[a-z]/, 'Password harus mengandung huruf kecil')
      .regex(/[0-9]/, 'Password harus mengandung angka')
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        'Password harus mengandung karakter spesial',
      ),
    confirmationPassword: z.string(),
  })
  .refine(data => data.password === data.confirmationPassword, {
    message: 'Konfirmasi password tidak sesuai',
    path: ['confirmationPassword'],
  });

const RegisterStepOne: React.FC<RegisterStepOneProps> = ({ navigation }) => {
  const setStepOne = useRegister((state) => state.setStepOne);
  const validateEmail = useRegister((state) => state.validateEmail);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmationPassword: '',
    },
    mode: 'all',
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = useCallback(async (data: FormData) => {
    const result = await validateEmail(data.email);
    if (!result.status) {
      return Alert.alert(result.messages);
    }

    setStepOne({ email: data.email, password: data.password });
    navigation.navigate('RegisterStep2');
  }, [navigation, setStepOne, validateEmail]);

  const getInputState = useCallback((name: keyof FormData) => {
    if (errors[name]) return 'negative';
    if (dirtyFields[name]) return 'positive';
  }, [errors, dirtyFields]);

  const onBack = useCallback(() => navigation.navigate('Login'), [navigation]);
  const onMasuk = useCallback(() => navigation.navigate('Login'), [navigation]);

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
          Buat Akun
        </Typography>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              state={getInputState('email')}
              placeholder="Masukkan email kamu"
              label="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              message={errors.email?.message}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              state={getInputState('password')}
              placeholder="Masukkan password kamu"
              label="Password"
              type="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              message={errors.password?.message}
            />
          )}
          name="password"
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              state={getInputState('confirmationPassword')}
              placeholder="Masukkan konfirmasi password"
              label="Konfirmasi Password"
              type="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              message={errors.confirmationPassword?.message}
            />
          )}
          name="confirmationPassword"
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

export default RegisterStepOne;

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
    marginTop: 20,
  },
  form: {
    marginHorizontal: 24,
    gap: 16,
    marginTop: 24,
  },
  'button-register': {
    marginHorizontal: 24,
    marginBottom: 32,
  },
  'error-message': {
    color: COLORS.purple200,
    marginTop: 8,
  },
});
