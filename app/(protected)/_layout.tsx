import { Stack, useRouter } from 'expo-router';
import { Alert } from 'react-native';
import useAuthStore from '~/store/AuthStore';

const ProtectedRouteLayout = () => {
  const { session } = useAuthStore();
  const router = useRouter();
  if (!session?.user) {
    Alert.alert('Your session has been expired login again to continue chat with your AI ');
    router.push('/');
  }
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ title: 'Chat with your AI' }} />
    </Stack>
  );
};

export default ProtectedRouteLayout;
