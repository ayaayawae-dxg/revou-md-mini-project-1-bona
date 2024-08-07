import React, { useCallback, useEffect, useState } from 'react';
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
import analytics from '@react-native-firebase/analytics';
import * as Keychain from 'react-native-keychain';

import { Button, TextField } from '@components/molecules';
import { Icon, Typography } from '@components/atom';
import { COLORS } from '@constant';
import { RootStackScreenProps } from '@navigation';
import { useAuth } from '@store';
import { encryptionServices } from '@services';

type LoginProps = RootStackScreenProps<'Login'>;

type FormData = {
  email: string;
  password: string;
};

const loginSchema: ZodType<FormData> = z.object({
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
});

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [fingerEnabled, setFingerEnabled] = useState<boolean>(false);

  const login = useAuth(state => state.login);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, dirtyFields, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    const result = await login(data);
    if (!result.status) {
      Alert.alert('Login gagal', 'Email atau password salah');
      return;
    }

    await Keychain.setGenericPassword(data.email, data.password, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    });
    navigation.reset({ routes: [{ name: 'Main' }] });
  };

  const getInputState = useCallback(
    (name: keyof FormData) => {
      if (errors[name]) return 'negative';
      if (dirtyFields[name]) return 'positive';
    },
    [errors, dirtyFields],
  );

  const onBack = useCallback(
    () => navigation.reset({ routes: [{ name: 'Onboarding' }] }),
    [navigation],
  );

  const onLewati = useCallback(() => navigation.navigate('Main'), [navigation]);

  const onRegister = useCallback(async () => {
    await analytics().logEvent('click_register_button');
    navigation.navigate('Register');
  }, [navigation, analytics]);

  const checkIsFingerAvailable = useCallback(async () => {
    const savedGenericPassword = await Keychain.getAllGenericPasswordServices();
    const deviceHasBiometrics = await Keychain.getSupportedBiometryType();

    if (savedGenericPassword.length > 0 && deviceHasBiometrics) {
      setFingerEnabled(true);
    }
  }, [setFingerEnabled]);

  const loginWithFingerprint = useCallback(async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        onSubmit({
          email: credentials.username,
          password: credentials.password,
        });
      }
    } catch (error) { }
  }, []);

  useEffect(() => {
    checkIsFingerAvailable();
  }, [checkIsFingerAvailable]);

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
            <Button variant="link" onPress={onLewati}>
              Lewati
            </Button>
          </View>
        </View>
        <Typography style={styles['header-title']} type="heading" size="large">
          Masuk ke Investly
        </Typography>
      </View>

      <View style={styles.form}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              state={getInputState('email')}
              placeholder="Email"
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
              placeholder="Masukkan password"
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
      </View>

      <View style={styles['forgot-password']}>
        {fingerEnabled && (
          <Button variant="link" onPress={loginWithFingerprint}>
            Login With Fingerprint
          </Button>
        )}
      </View>

      <Button
        style={styles['button-login']}
        disabled={!isValid || isSubmitting}
        onPress={handleSubmit(onSubmit)}>
        {isSubmitting ? <ActivityIndicator /> : 'Masuk'}
      </Button>

      <View style={styles.flex}></View>

      <Button
        style={styles['button-register']}
        variant="outline"
        onPress={onRegister}>
        Daftar
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
