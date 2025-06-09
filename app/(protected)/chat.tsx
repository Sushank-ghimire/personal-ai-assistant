import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageInput from '~/components/MessageInput';
import useAuthStore from '~/store/AuthStore';

const AskYourAI = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const handleSendMessage = async () => {};

  const handleVoiceInput = async () => {};

  const [message, setMessage] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 90 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <View>
                <Text className="text-4xl font-bold tracking-wider text-indigo-500">
                  Your Personal AI Assistant
                </Text>
                {/* Chat messages go here */}
                <Text>Chat Messages Goes Here</Text>
              </View>
            </ScrollView>

            {/* Bottom input bar (NOT absolutely positioned anymore) */}
            <MessageInput
              handleSendMessage={handleSendMessage}
              handleVoiceInput={handleVoiceInput}
              message={message}
              setMessage={setMessage}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AskYourAI;
