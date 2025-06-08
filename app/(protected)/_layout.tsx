import { Stack, useRouter } from 'expo-router';
import useAuthStore from '~/store/AuthStore';

const ProtectedRouteLayout = () => {
  const { session } = useAuthStore();
  const router = useRouter();
  if (!session?.user) {
    router.push('/');
  }
  return (
    <Stack>
      <Stack.Screen name="chat" options={{ title: 'Chat with your AI', headerShown: false }} />
    </Stack>
  );
};

export default ProtectedRouteLayout;
