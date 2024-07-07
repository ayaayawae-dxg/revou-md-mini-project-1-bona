import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from '@components/molecules'

type LoginProps = {
  navigation: any
}

const Login: React.FC<LoginProps> = ({ navigation }) => {
  return (
    <View>
      <Text>Login</Text>
      <Button onPress={() => { navigation.navigate('HomeTab')}}>Masuk</Button>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({})