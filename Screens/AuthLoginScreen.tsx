import {Input, Text} from '@rneui/themed';
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';
import {supabase} from '../Supabase/supabase';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/store';

export const AuthLoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const {error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: {session},
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!session)
      Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
    if (error) Alert.alert(error.message);
    if (error) console.log(error);
  }

  async function signOut() {
    setLoading(true);
    const {error} = await supabase.auth.signOut();
    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  const GLOBALAUTH = useSelector((state: RootState) => state.authGlobal.value);

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text>
          <Text>{GLOBALAUTH?.user.email}</Text>
        </Text>
        <Input
          label="Email"
          leftIcon={{type: 'font-awesome', name: 'envelope'}}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{type: 'font-awesome', name: 'lock'}}
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Log out" disabled={loading} onPress={() => signOut()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});
