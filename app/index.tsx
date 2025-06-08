import { useState } from 'react';
import * as Linking from 'expo-linking';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import useAuthStore from '~/store/AuthStore';
import { supabase } from '~/utils/supabase';
import { useRouter } from 'expo-router';

const LoginScreen = () => {
  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      Alert.alert('Login successful');
    } catch (error: any) {
      Alert.alert('Login failed', error.message || String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "",
      },
    });
    if (error) Alert.alert(`Login with ${provider} failed`, error.message);
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        persistentScrollbar
        showsVerticalScrollIndicator={false}
        className="px-6">
        <View className="flex-1 justify-center py-56 ">
          <Text className="mb-10 text-center text-4xl font-bold text-indigo-600">Welcome Back</Text>

          <View className="gap-5 space-y-4">
            <TextInput
              className="rounded-xl border border-gray-300 px-4 py-3 text-lg font-medium"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              placeholderTextColor="#9ca3af"
            />

            <View className="relative">
              <TextInput
                className="rounded-xl border border-gray-300 px-4 py-3 pr-12 text-lg font-medium"
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity
                className="absolute right-4 top-3.5"
                onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? 'eye-off' : 'eye'} size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="mt-6 rounded-xl bg-indigo-600 py-3 disabled:bg-indigo-400"
            onPress={handleLogin}
            disabled={loading || !email || !password}>
            <Text className="text-center text-base font-semibold text-white">
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>

          <Text className="my-6 text-center text-lg font-medium text-gray-400">
            or continue with
          </Text>

          <View className="mb-6 flex-row justify-center gap-6 space-x-6">
            <TouchableOpacity
              className="rounded-full border border-gray-300 bg-white p-3 shadow-sm"
              onPress={() => handleOAuthLogin('google')}>
              <AntDesign name="google" size={24} color="#EA4335" />
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-full border border-gray-300 bg-white p-3 shadow-sm"
              onPress={() => handleOAuthLogin('github')}>
              <FontAwesome name="github" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View className="mt-auto flex flex-row items-center justify-center pt-4">
            <Text className="text-center text-lg text-gray-600">Don’t have an account? </Text>{' '}
            <TouchableOpacity
              className="flex items-center justify-center text-center"
              onPress={() => {}}>
              <Text className="text-lg font-semibold text-indigo-600">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
