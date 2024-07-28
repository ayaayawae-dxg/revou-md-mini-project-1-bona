import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { faker } from '@faker-js/faker';

import { COLORS } from '@constant';
import { Icon, Typography } from '@components/atom';
import { Button, SimpleTextField, TextField } from '@components/molecules';
import { useAuth, useFeed } from '@hooks';
import { RootStackScreenProps } from '@navigation';

type FeedCreateProps = RootStackScreenProps<'FeedCreate'>

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
  const { user } = useAuth();
  const { setFeedData } = useFeed();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      topic: '',
      judul: '',
      deskripsi: '',
    },
    mode: 'all',
    resolver: zodResolver(feedCreateSchema),
  });

  const onBack = () => navigation.goBack();

  const onSubmit = (data: FormData) => {
    const createdData: FeedProps = {
      avatar_url: user?.avatar_url || '',
      id: faker.string.uuid(),
      name: "Bon",
      created_at: new Date(),
      post_header: data.judul,
      post_content: data.deskripsi,
      post_topic: data.topic,
      post_upvote: 0,
      post_downvote: 0,
      post_comment: 0
    }

    setFeedData(prev => [...prev, createdData]);
    navigation.goBack();
  };

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
            disabled={!isValid}
            onPress={handleSubmit(onSubmit)}>
            Post
          </Button>
        </View>
      </View>

      <View style={styles['type-area-container']}>
        <View style={styles['input-topic-container']}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                state="default-no-label"
                placeholder="Topic"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
