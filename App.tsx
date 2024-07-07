import React from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Icon, Typography } from '@components/atom';
import { Button } from '@components/molecules';
import { COLORS } from '@constant';
import { HeartIcon } from '@assets/icons';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <View style={{ padding: 16 }}>

        <Typography>dss21323s</Typography>
        <Typography>dss21323s</Typography>
        <Typography size="large">dss21323s</Typography>
        <Typography type="heading" size="xxlarge">
          Heading/XXLarge
        </Typography>
        <Typography type="special" size="large">
          dss21323dasds
        </Typography>
        <Typography type="special" size="large">
          dss21323dasds
        </Typography>

        <View style={{ borderWidth: 1, marginVertical: 8 }}></View>

        <HeartIcon color={COLORS.green600} />

        <Button>aaa</Button>
        <Button disabled>aaa</Button>
        <Button variant="link">aaa</Button>
        <Button type="icon-left" icon={<Icon name="heart" />}>
          Icon Left
        </Button>
        <Button type="icon-right" disabled icon={<Icon name="heart" />}>
          Icon right
        </Button>
        <Button type="icon-left" variant="outline" icon={<Icon name="heart" />}>
          Icon Left
        </Button>
        <Button
          type="icon-right"
          variant="outline"
          disabled
          icon={<Icon name="heart" />}>
          Icon right
        </Button>
        <Button
          onPress={() => Alert.alert('asd', 'messageee')}
          type="icon-left"
          variant="tertiary"
          icon={<Icon name="heart" />}>
          Icon Left
        </Button>
        <Button
          onPress={() => Alert.alert('asd', 'messageee')}
          type="icon-only"
          variant="tertiary"
          icon={<Icon name="heart" />}>
          Icon Left
        </Button>
        <Button
          type="icon-only"
          variant="tertiary"
          disabled
          icon={<Icon name="heart" />}>
          Icon right
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
