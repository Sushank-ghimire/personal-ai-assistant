import { View, Text } from 'react-native';
import useCachedResources from '~/hooks/useCachedResources';
import useAuthStore from '~/store/AuthStore';
import { useEffect } from 'react';
import { supabase } from '~/utils/supabase';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';

const ProtectedRouteLayout = () => {
  const isLoadingComplete = useCachedResources();

  const { setSession, logout } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    supabase.auth
      .refreshSession()
      .then(async (session) => {
        console.log('session', session);
        setSession(session.data.session);
        if (session.error) await logout();
        Alert.alert('Login required', 'Your session is expired please login again', [
          {
            text: 'Ok',
            onPress: () => router.push("/")
          },
        ]);
      })
      .catch(async (error: Error) => {
        console.log('error', error);
        Alert.alert('Error occured', error.message);
      });
  }, []);
  return (
    <View>
      <Text>ProtectedRouteLayout</Text>
    </View>
  );
};

export default ProtectedRouteLayout;
