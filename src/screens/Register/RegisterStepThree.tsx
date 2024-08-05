import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import notifee, { AndroidImportance } from '@notifee/react-native';

import { Button, ProgressBar, TopicItem } from '@components/molecules';
import { Icon, Typography } from '@components/atom';
import { COLORS } from '@constant';
import { RegisterStackScreenProps } from '@navigation';
import { useAuth, useRegister } from '@store';

type RegisterStepThreeProps = RegisterStackScreenProps<'RegisterStep3'>;

const RegisterStepThree: React.FC<RegisterStepThreeProps> = ({
  navigation,
}) => {
  const isLoading = useRegister(state => state.isLoading);
  const topicList = useRegister(state => state.topicList);
  const selectedTopics = useRegister(state => state.selectedTopics);
  const fetchTopicList = useRegister(state => state.fetchTopicList);
  const selectTopic = useRegister(state => state.selectTopic);
  const setStepThree = useRegister(state => state.setStepThree);
  const registerUser = useRegister(state => state.registerUser);
  const getStepThreeAnalyticsPayload = useRegister(
    state => state.getStepThreeAnalyticsPayload,
  );

  const setToken = useAuth(state => state.setToken);

  const isSubmitDisabled = useMemo(
    () => selectedTopics.length !== 3,
    [selectedTopics],
  );

  const displaySuccessNotification = useCallback(async () => {
    const channelId = await notifee.createChannel({
      id: 'register-success',
      name: 'Register Channel',
      importance: AndroidImportance.HIGH
    });

    await notifee.displayNotification({
      title: 'Horrrayy!, Daftar Berhasil!',
      android: {
        channelId,
      },
    });
  }, []);

  const onSubmit = useCallback(async () => {
    setStepThree({ favoriteTopics: selectedTopics });

    await analytics().logEvent(
      'click_register_button_step_3',
      getStepThreeAnalyticsPayload(),
    );

    const result = await registerUser();
    if (!result.status) {
      Alert.alert('Gagal Mendaftar', result.messages);
      await analytics().logEvent('failed_register_account', {
        ...getStepThreeAnalyticsPayload(),
        error_message: result.messages,
      });
      return;
    }

    await analytics().logEvent(
      'success_register_account',
      getStepThreeAnalyticsPayload(),
    );

    await displaySuccessNotification();

    setToken(result.data.access_token);
    navigation.reset({ routes: [{ name: 'Main' }] });
  }, [setStepThree, registerUser, selectedTopics, analytics, displaySuccessNotification]);

  const onBack = useCallback(() => navigation.goBack(), [navigation]);

  useEffect(() => {
    fetchTopicList();
  }, [fetchTopicList]);

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
          <View style={styles['header-action-right']}></View>
        </View>
        <Typography style={styles['header-title']} type="heading" size="large">
          Pilih 3 Topik Favorit
        </Typography>
      </View>

      <View style={styles['list-container']}>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles['list']}
          data={topicList}
          numColumns={3}
          columnWrapperStyle={styles['column-wrapper']}
          contentContainerStyle={styles['content-container']}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TopicItem
                key={item.id}
                fullPath={item.file.full_path}
                id={item.id}
                label={item.label}
                nameDisplay={item.file.name_display}
                isSelected={selectedTopics.includes(item.id)}
                onPress={() => selectTopic(item.id)}
              />
            );
          }}
        />
      </View>

      <View style={styles.footer}>
        <ProgressBar step={3} totalSteps={3} style={styles['progress-bar']} />
        <Button
          disabled={isSubmitDisabled}
          style={styles['button-register']}
          onPress={onSubmit}>
          {isLoading ? <ActivityIndicator /> : 'Daftar'}
        </Button>
      </View>
    </View>
  );
};

export default RegisterStepThree;

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
  'list-container': {
    flex: 1,
    marginTop: 8,
  },
  list: {
    flex: 1,
    marginVertical: 16,
    marginHorizontal: 24,
  },
  'column-wrapper': {
    gap: 10,
  },
  'content-container': {
    gap: 10,
  },
  footer: { marginTop: 14 },
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
