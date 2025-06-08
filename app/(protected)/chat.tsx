import { useRouter } from 'expo-router';
import { Alert, ScrollView, Text, View } from 'react-native';
import { Button } from '~/components/Button';
import useAuthStore from '~/store/AuthStore';

const AskYourAI = () => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    router.push('/');
  };
  return (
    <ScrollView className="flex-1 flex-grow-0 px-8 py-12">
      <View>
        <Text>Chat with your AI</Text>
        <Button title="Logout" onPress={handleLogout} />
      </View>
    </ScrollView>
  );
};

export default AskYourAI;
