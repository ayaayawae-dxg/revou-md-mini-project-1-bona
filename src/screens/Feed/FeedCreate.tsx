import {
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import analytics from '@react-native-firebase/analytics';

import { COLORS } from '@constant';
import { Icon, Typography } from '@components/atom';
import { Button, Select, SimpleTextField } from '@components/molecules';
import { useAuth, useFeed, useTopic } from '@store';
import { RootStackScreenProps } from '@navigation';

type FeedCreateProps = RootStackScreenProps<'FeedCreate'>;

type FormData = {
  topic: string;
  judul: string;
  deskripsi: string;
};

const feedCreateSchema: ZodType<FormData> = z.object({
  topic: z.string().min(1, 'Topic harus diisi').trim(),
  judul: z.string().min(1, 'Judul harus diisi'),
  deskripsi: z.string().min(1, 'Deskripsi harus diisi'),
});

const FeedDetail: React.FC<FeedCreateProps> = ({ navigation, route }) => {
  const user = useAuth(state => state.user);
  const topics = useTopic(state => state.topics);
  const fetchTopic = useTopic(state => state.fetchTopic);
  const createFeed = useFeed(state => state.createFeed);

  const topicList = useMemo(() => {
    return topics.map(topic => ({ label: topic.label, value: topic.id }));
  }, [topics]);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      topic: '',
      judul: '',
      deskripsi: '',
    },
    mode: 'all',
    resolver: zodResolver(feedCreateSchema),
  });

  const onBack = useCallback(() => navigation.goBack(), [navigation]);

  const onSubmit = useCallback(
    async (data: FormData) => {
      const result = await createFeed({
        content: data.deskripsi,
        header: data.judul,
        topic_id: data.topic,
        is_anonim: 'false',
      });
      if (!result.status) {
        await analytics().logEvent('Failed_create_post', {
          username: user?.username,
          email: user?.email,
          error_message: result.messages,
        });
        ToastAndroid.show(
          result.messages || 'Failed Create Post',
          ToastAndroid.SHORT,
        );
        return;
      }

      await analytics().logEvent('Success_create_post', {
        username: user?.username,
        email: user?.email,
      });
      ToastAndroid.show('Success Create Post', ToastAndroid.SHORT);

      navigation.reset({ routes: [{ name: 'Main' }] });
    },
    [createFeed, navigation],
  );

  useEffect(() => {
    fetchTopic();
  }, [fetchTopic]);

  return (
    <View style={styles['container']}>
      <View style={styles['header-action']}>
        <View style={styles['header-action-icon-container']}>
          <TouchableOpacity onPress={onBack}>
            <Icon name="chevron-left" width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View style={styles['header-action-text-container']}>
          <Typography type="heading" style={styles['header-action-text']}>
            Buat
          </Typography>
        </View>
        <View style={styles['header-action-button-container']}>
          <Button
            size="small"
            style={styles['header-action-button']}
            disabled={!isValid || isSubmitting}
            onPress={handleSubmit(onSubmit)}>
            {isSubmitting ? <ActivityIndicator /> : 'Post'}
          </Button>
        </View>
      </View>

      <View style={styles['type-area-container']}>
        <View style={styles['input-topic-container']}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Select
                placeholder="Select a topic..."
                onValueChange={onChange}
                value={value}
                items={topicList}
              />
            )}
            name="topic"
          />
        </View>

        <View style={styles['input-judul-container']}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <SimpleTextField
                size="xlarge"
                type="heading"
                placeholder="Judul"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="judul"
          />
        </View>

        <View style={styles['input-deskripsi-container']}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <SimpleTextField
                placeholder="Deskripsi"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                style={styles['input-deskripsi']}
              />
            )}
            name="deskripsi"
          />
        </View>
      </View>

      <View style={styles['attachment-area-container']}>
        <View style={styles['attachment-container']}>
          <View style={styles['attachment-item']}>
            <Icon
              name="paperclip"
              fill={COLORS.neutral600}
              width={20}
              height={20}
            />
          </View>
          <View style={styles['attachment-item']}>
            <Icon
              name="image"
              fill={COLORS.neutral600}
              width={20}
              height={20}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default FeedDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral100 },
  flex: { flex: 1 },
  'header-action-icon-container': {},
  'header-action-text-container': { flex: 1 },
  'header-action-text': {},
  'header-action': {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
  'header-action-button-container': {},
  'header-action-button': {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  'type-area-container': {
    flex: 1,
    gap: 32,
  },
  'input-topic-container': {
    marginTop: 24,
    marginHorizontal: 24,
  },
  'input-judul-container': {
    marginHorizontal: 24,
  },
  'input-deskripsi-container': {
    marginHorizontal: 24,
  },
  'input-deskripsi': {
    paddingBottom: 64,
  },

  'attachment-area-container': {
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
  },
  'attachment-container': {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: 4,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  'attachment-item': {
    padding: 8,
  },
});
