import {
  FlatList,
  Image,
  ImageSourcePropType,
  NativeScrollEvent,
  StyleSheet,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Button } from '@components/molecules';
import { Dots, Typography } from '@components/atom';
import {
  OnboardingConnectLogo,
  OnboardingInvestLogo,
  OnboardingLearnLogo,
} from '@assets/images';
import { getScreenWidth } from '@utils/screen';
import { COLORS } from '@constant';
import { RootStackScreenProps } from '@navigation';
import { useAuth } from '@store';

type OnboardingProps = RootStackScreenProps<'Onboarding'>;

type StepProps = {
  image: ImageSourcePropType;
  title: string;
  description: string;
};

const STEPS: StepProps[] = [
  {
    image: OnboardingConnectLogo,
    title: 'Connect',
    description:
      'Dapatkan akses ke investor profesional terpercaya dan mulai investasi bareng teman dan komunitas',
  },
  {
    image: OnboardingLearnLogo,
    title: 'Learn',
    description:
      'Dapatkan ide investasi dan informasi terpercaya langsung dari ahlinya biar kamu makin jago dan makin cuan!',
  },
  {
    image: OnboardingInvestLogo,
    title: 'Invest',
    description:
      'Atur portfolio kamu dan langsung berinvestasi dengan mudah dengan beragam pilihan aset',
  },
];

const renderItem = ({ item }: { item: StepProps }) => {
  return (
    <View style={styles['item-container']}>
      <View>
        <Image source={item.image} />
      </View>
      <View style={styles.content}>
        <Typography
          type="heading"
          size="xlarge"
          style={styles['content-title']}>
          {item.title}
        </Typography>
        <Typography style={styles['content-description']}>
          {item.description}
        </Typography>
      </View>
    </View>
  );
};

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const getToken = useAuth(state => state.getToken);
  const ref = useRef<FlatList>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isLastStep = useMemo(
    () => currentStep === STEPS.length - 1,
    [currentStep],
  );

  const onNext = useCallback(() => {
    if (isLastStep) {
      navigation.navigate('Login');
      return;
    }

    const nextStep = currentStep + 1;
    ref.current?.scrollToIndex({ index: nextStep, animated: true });
    setCurrentStep(nextStep);
  }, [currentStep, isLastStep, navigation]);

  const onScroll = useCallback(
    ({ nativeEvent }: { nativeEvent: NativeScrollEvent }) => {
      const page = Math.round(nativeEvent.contentOffset.x / getScreenWidth);
      setCurrentStep(page);
    },
    [],
  );

  const renderDots = useMemo(() => (
    <View style={styles.dots}>
      {STEPS.map((_, index) => (
        <Dots key={index} active={currentStep === index} />
      ))}
    </View>
  ), [currentStep]);

  useEffect(() => {
    const token = getToken();
    if (token) {
      navigation.reset({ routes: [{ name: 'Main' }] });
    }
  }, [getToken]);

  return (
    <View style={styles.container}>
      <View style={styles.flex}></View>
      <View style={styles.body}>
        <FlatList
          data={STEPS}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={ref}
          onMomentumScrollEnd={onScroll}
        />
        {renderDots}
      </View>
      <View style={styles.flex}></View>
      <Button style={styles.button} onPress={onNext}>
        {isLastStep ? 'Get Started' : 'Next'}
      </Button>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.neutral100,
    justifyContent: 'center',
  },
  body: {
    alignItems: 'center',
    gap: 24,
    marginTop: 42,
  },
  flex: { flex: 1 },
  'item-container': {
    width: getScreenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 320,
  },
  'content-title': {
    color: 'black',
    textAlign: 'center',
  },
  'content-description': {
    color: 'black',
    marginTop: 16,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 20,
    marginBottom: 44,
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
  },
});
