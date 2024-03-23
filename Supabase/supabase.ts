import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY} from '@env';
import 'react-native-get-random-values'
import CryptoJS from 'crypto-js';
import * as Keychain from 'react-native-keychain';

class LargeSecureStore {
  async _encrypt(key: string, value: string): Promise<string> {
    const encryptionKey = CryptoJS.lib.WordArray.random(256 / 8);
    const encryptedValue = CryptoJS.AES.encrypt(value, encryptionKey, { mode: CryptoJS.mode.CTR });

    await AsyncStorage.setItem(key, encryptedValue.toString());
    await Keychain.setGenericPassword(key, encryptionKey.toString());

    return encryptedValue.toString();
  }

  async _decrypt(key: string, value: string): Promise<string | null> {
    const keychainResult = await Keychain.getGenericPassword({ service: key });
    if (!keychainResult || !keychainResult.password) {
      return null; // Handle case where encryption key is not found
    }

    const encryptionKey = keychainResult.password;
    const decryptedValue = CryptoJS.AES.decrypt(value, encryptionKey);
    return decryptedValue.toString(CryptoJS.enc.Utf8);
  }

  async getItem(key: string): Promise<string | null> {
    const encryptedValue = await AsyncStorage.getItem(key);
    if (!encryptedValue) {
      return null; // Handle case where item is not found
    }

    return await this._decrypt(key, encryptedValue);
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
    await Keychain.resetGenericPassword({ service: key });
  }

  async setItem(key: string, value: string): Promise<void> {
    const encryptedValue = await this._encrypt(key, value);
    await AsyncStorage.setItem(key, encryptedValue);
  }
}

//create  ENV  for this
const supabaseUrl = REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = REACT_NATIVE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

//https://supabase.com/blog/react-native-authentication
