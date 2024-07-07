import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React, { useRef, useState } from 'react';

import { Button } from '@components/molecules';
import {
  OnboardingConnectLogo,
  OnboardingInvestLogo,
  OnboardingLearnLogo,
} from '@assets/images';
import { COLORS } from '@constant';
import { getScreenWidth } from '@utils/screen';
import { Typography } from '@components/atom';

type OnboardingProps = {
  navigation: any;
};

type StepProps = {
  image: React.FC<SvgProps>;
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

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const ref = useRef<FlatList>(null)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const isLastStep = currentStep === STEPS.length - 1

  const renderItem = ({ item }: { item: StepProps }) => {
    return (
      <View style={styles['item-container']}>
        <View>
          <item.image />
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

  const onNext = () => {
    if (isLastStep) {
      return navigation.navigate('Login');
    }

    const nextStep = currentStep + 1
    ref.current?.scrollToIndex({ index: nextStep, animated: false })
    setCurrentStep(nextStep)
  };

  const getButtonTextByStep = () => {
    if (isLastStep) {
      return "Get Started"
    }
    return "Next"
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={STEPS}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={ref}
      />
      <Button style={styles.button} onPress={onNext}>
        {getButtonTextByStep()}
      </Button>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: 44 },
  flex: { flex: 1 },
  'item-container': {
    width: getScreenWidth(),
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
  },
});
