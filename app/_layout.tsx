import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import useCachedResources from '~/hooks/useCachedResources';
import useAuthStore from '~/store/AuthStore';
import { useEffect } from 'react';
import { supabase } from '~/utils/supabase';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function Layout() {
  const isLoadingComplete = useCachedResources();

  const { setSession, logout } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    supabase.auth
      .refreshSession()
      .then(async (session) => {
        setSession(session.data.session);
        if (session.error) await logout();
        if (session.data.user) {
          router.push('/chat');
        }
      })
      .catch(async (error: Error) => {
        console.log('Error', error);
        Alert.alert('Error occured', error.message);
      });
  }, []);

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <>
      <StatusBar style="dark" networkActivityIndicatorVisible animated hidden={false} />
      <Stack
        screenOptions={{
          headerShown: false,
          keyboardHandlingEnabled: true,
          fullScreenGestureEnabled: true,
          statusBarAnimation: 'fade',
          animation: 'simple_push',
        }}>
        <Stack.Screen name="index" options={{ title: 'Home Screen' }} />
        <Stack.Screen name="+not-found" options={{ title: 'Notfound Screen' }} />
        <Stack.Screen name="signup" options={{ title: 'Signup Page' }} />
        <Stack.Screen name="(protected)" options={{ title: 'Protected Page' }} />
      </Stack>
    </>
  );
}
