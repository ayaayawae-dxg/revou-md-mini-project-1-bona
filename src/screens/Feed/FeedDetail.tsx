import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import { COLORS } from '@constant';
import { Icon, Typography } from '@components/atom';
import { Button, TextField } from '@components/molecules';
import { Feed } from '@components/organisms';
import { Controller, useForm } from 'react-hook-form';

type FeedDetailProps = NativeStackScreenProps<RootStackParamList, 'FeedDetail'>;

type FormData = {
  notes: string;
};

const FeedDetail: React.FC<FeedDetailProps> = ({ navigation, route }) => {
  const onBack = () => navigation.goBack();
  const params = route.params;
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, dirtyFields },
  } = useForm<FormData>({
    defaultValues: {
      notes: '',
    },
    mode: 'all',
  });
  const canSubmit = watch('notes').length > 0;

  return (
    <View style={styles['container']}>
      <View style={styles['header-action']}>
        <View style={styles['header-action-icon']}>
          <TouchableOpacity onPress={onBack}>
            <Icon name="chevron-left" width={20} height={20} />
          </TouchableOpacity>
        </View>
        <View style={styles['header-action-text']}>
          <Typography type="heading">Post</Typography>
        </View>
      </View>

      <ScrollView style={styles['feed-container']}>
        <Feed {...params} />
      </ScrollView>

      <View style={styles['type-area-container']}>
        <View style={styles['input-container']}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                state="default-no-label"
                placeholder="Ketik Disini"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="notes"
          />
        </View>
        <View style={styles['send-container']}>
          <Button disabled={!canSubmit} type="icon-only" icon={<Icon name="paper-plane" />} />
        </View>
      </View>
    </View>
  );
};

export default FeedDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.neutral100 },
  flex: { flex: 1 },
  'header-action-icon': {},
  'header-action-text': { flex: 1 },
  'header-action': {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    gap: 24,
  },
  'header-title': {
    marginHorizontal: 24,
    textAlign: 'center',
    marginTop: 24,
  },
  'feed-container': {
    flex: 1,
  },

  'type-area-container': {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.neutral300,
    paddingHorizontal: 24,
    paddingTop: 13,
    paddingBottom: 16,
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  'input-container': {
    flex: 1,
  },
  'send-container': {},
});
