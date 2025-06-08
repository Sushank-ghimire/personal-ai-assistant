import { Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const NotFoundScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="mb-4 text-7xl">😕</Text>
      <Text className="mb-2 text-2xl font-bold text-gray-800">Page Not Found</Text>
      <Text className="mb-6 text-center text-gray-500">
        The page you're looking for doesn't exist or has been moved.
      </Text>

      <TouchableOpacity
        className="mt-2 rounded-lg bg-indigo-600 px-6 py-3"
        onPress={() => {
          router.push('/');
        }}>
        <Text className="text-base font-semibold text-white">Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotFoundScreen;
