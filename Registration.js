import React, { useState } from 'react'
import { Button, FormLabel, FormInput } from 'react-native-elements'
import {
  View,
  TextInput,
  StyleSheet
} from 'react-native'

export default function signUp() {
  const [profileObj, setProfileObj] = useState({
    username: '', password: '', email: '', phone_number: ''
  })
  function onChangeText(key, val) {
    setProfileObj({ [key]: val })
  }
  async function signUp() {
    const { username, password, email, phone_number } = profileObj
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
    return (
      <View style={styles.container}>
          <View style={styles.form}>
          <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='white'
          onChangeText={val => onChangeText('email', val)}
        />
          <Button 
            buttonStyle={{borderRadius: 20, width: 120, marginLeft: 'auto', marginRight: 'auto'}}
            title='Sign Up'
        />
          </View>
      </View>
    )
  }
const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    opacity: 0.8,
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 20,
    fontSize: 18,
    fontWeight: '300'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  form: {
    backgroundColor: '#002f6c'
  }
})

