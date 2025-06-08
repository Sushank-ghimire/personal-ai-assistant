import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import useAuthStore from '~/store/AuthStore';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const UserSignUp = () => {
  const { register } = useAuthStore();

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUserRegister = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert(
          'Weak Password',
          'Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.'
        );
        return;
      }

      setLoading(true);
      await register(email, password);
      Alert.alert('Signup', 'Signup Successfull', [
        {
          text: 'Login',
          onPress: () => router.push('/'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Login failed', error.message || String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      persistentScrollbar
      showsVerticalScrollIndicator={false}
      className="min-h-screen w-screen flex-1 flex-grow overflow-y-scroll px-6">
      <View className="h-screen w-full flex-col items-center justify-center">
        <Text className="mb-10 text-center text-4xl font-bold tracking-wider text-indigo-600">
          Signup To Continue
        </Text>
        <View className="w-full gap-5 space-y-4">
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
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 disabled:bg-indigo-400"
          onPress={handleUserRegister}
          disabled={loading || !email || !password}>
          <Text className="text-center text-base font-semibold text-white">
            {loading ? <ActivityIndicator color={'white'} size={'small'} animating /> : 'Signup'}
          </Text>
        </TouchableOpacity>

        <View className="mt-12 flex flex-row">
          <Text className="text-center text-lg text-gray-600">Already have an account? </Text>
          <TouchableOpacity
            className="flex items-center justify-center text-center"
            onPress={() => {
              router.push('/');
            }}>
            <Text className="text-lg font-semibold text-indigo-600">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserSignUp;
