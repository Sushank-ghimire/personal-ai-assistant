import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
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
import { useVoiceRecognition } from '~/hooks/useVoiceInput';
import { PermissionsAndroid } from 'react-native';

const requestMicPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
      title: 'Microphone Permission',
      message: 'App needs access to your microphone to record your voice',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    });
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const AskYourAI = () => {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const {
    state,
    startRecognizing,
    stopRecognizing,
    cancelRecognizing,
    destryoRecognizer,
    resetState,
  } = useVoiceRecognition();

  const handleSendMessage = async () => {};

  const handleStopRecognizing = async () => {
    await stopRecognizing();
  };

  const [message, setMessage] = useState('');

  useEffect(() => {
    requestMicPermission();
  }, []);

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
                <Text className="flex flex-col text-xl font-bold tracking-wider ">
                  {JSON.stringify(state)}
                </Text>
              </View>
            </ScrollView>

            {/* Bottom input bar (NOT absolutely positioned anymore) */}
            <MessageInput
              handleSendMessage={handleSendMessage}
              onPressIn={startRecognizing}
              onPressOut={handleStopRecognizing}
              message={message}
              setMessage={setMessage}
              handleStopRecognizing={handleStopRecognizing}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AskYourAI;
