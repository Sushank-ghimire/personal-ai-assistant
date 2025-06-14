import { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome, AntDesign, Feather } from '@expo/vector-icons';
import useAuthStore from '~/store/AuthStore';
import { useRouter } from 'expo-router';
import { Button } from '~/components/Button';

const LoginScreen = () => {
  const { login, session, logout } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (session?.user.id) {
      router.push('/chat');
    }
  }, [session?.user.id]);

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    Alert.alert('Currently not available updating as soon as possible');
    return;
    // const { error, data } = await supabase.auth.signInWithOAuth({
    //   provider,
    // });
    // if (error) {
    //   Alert.alert(`OAuth signup failed`, error.message);
    // } else if (data?.url) {
    //   let result = await WebBrowser.openBrowserAsync(data.url);
    //   console.log('Data : ', data);
    //   console.log('Browser result : ', result);
    // }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }
      await login(email, password);
      Alert.alert('Login successful', '', [
        {
          text: 'Ok',
          onPress: () => router.push('/chat'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Login failed', error.message || String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Session delete ?', 'Are you sure want to logout ?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await logout();
          router.push('/');
        },
        style: 'destructive',
      },
    ]);
    router.push('/');
  };

  if (session?.user) {
    return (
      <View className="flex min-h-screen w-screen items-center justify-center px-12">
        <Text className="mb-10 text-center text-4xl font-bold text-indigo-600">Welcome Back</Text>
        <Button
          onPress={() => {
            router.prefetch('/chat');
          }}
          className="w-full rounded-sm p-2 text-xl"
          title="Chat With your AI Assistant"
        />
        <Button
          onPress={handleLogout}
          className="mt-4 w-full rounded-sm bg-red-500 p-2 text-xl"
          title="Logout"
        />
      </View>
    );
  }

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
              {loading ? <ActivityIndicator color={'white'} size={'small'} animating /> : 'Login'}
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
            <Text className="text-center text-lg text-gray-600">Don’t have an account? </Text>
            <TouchableOpacity
              className="flex items-center justify-center text-center"
              onPress={() => {
                router.push('/signup');
              }}>
              <Text className="text-lg font-semibold text-indigo-600">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
