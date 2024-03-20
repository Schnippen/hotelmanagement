import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY} from '@env';

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
//https://www.npmjs.com/package/aes-js
//https://www.npmjs.com/package/react-native-get-random-values
