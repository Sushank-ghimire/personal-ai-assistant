import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
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
import { ChatHistory } from '~/store/ChatStore';
import DisplayMessages from '~/components/DisplayMessages';

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

const messages: ChatHistory[] = [
  {
    userid: 'user_123',
    role: 'user',
    content: 'Hello, how are you today?',
    created_at: new Date('2023-05-15T09:30:00Z'),
    id: 'msg_001',
  },
  {
    userid: 'assistant_001',
    role: 'assistant',
    content: "I'm doing well, thank you! How can I help you?",
    created_at: new Date('2023-05-15T09:31:00Z'),
    id: 'msg_002',
    session_id: 'sess_abc123',
  },
  {
    userid: 'user_123',
    role: 'user',
    content: 'Can you tell me about your features?',
    created_at: new Date('2023-05-15T09:32:00Z'),
    id: 'msg_003',
    session_id: 'sess_abc123',
  },
  {
    userid: 'assistant_001',
    role: 'assistant',
    content:
      'Sure! I can answer questions, provide information, and assist with various tasks. What specifically would you like to know?',
    created_at: new Date('2023-05-15T09:33:00Z'),
    id: 'msg_004',
  },
  {
    userid: 'user_456',
    role: 'user',
    content: "What's the weather like today?",
    created_at: new Date('2023-05-16T10:15:00Z'),
    id: 'msg_005',
    session_id: 'sess_def456',
  },
  {
    userid: 'assistant_001',
    role: 'assistant',
    content:
      "I'm sorry, I don't have access to real-time weather data. You might want to check a weather service or app.",
    created_at: new Date('2023-05-16T10:16:00Z'),
    id: 'msg_006',
    session_id: 'sess_def456',
  },
  {
    userid: 'user_789',
    role: 'user',
    content: 'Thanks for your help!',
    created_at: new Date('2023-05-17T14:22:00Z'),
    id: 'msg_007',
  },
  {
    userid: 'assistant_001',
    role: 'assistant',
    content: "You're welcome! Let me know if you need anything else.",
    created_at: new Date('2023-05-17T14:23:00Z'),
    id: 'msg_008',
    session_id: 'sess_ghi789',
  },
  {
    userid: 'user_123',
    role: 'user',
    content: 'How do I reset my password?',
    created_at: new Date('2023-05-18T11:05:00Z'),
    id: 'msg_009',
    session_id: 'sess_jkl012',
  },
  {
    userid: 'assistant_001',
    role: 'assistant',
    content:
      "You can reset your password by going to the account settings page and clicking on 'Forgot Password'.",
    created_at: new Date('2023-05-18T11:06:00Z'),
    id: 'msg_010',
  },
];

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

  const handleStartListining = async () => {
    if (await requestMicPermission()) {
      await startRecognizing();
    } else {
      Alert.alert(
        'Microphone Access denied',
        'Allow this app to access your microphone to continue speech recognition'
      );
    }
  };

  const [message, setMessage] = useState('');


  const flatListRef = useRef<FlatList>(null);

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
                {messages.map((msg, i) => (
                  <DisplayMessages message={msg} key={i.toString()} />
                ))}
              </View>
            </ScrollView>

            {/* Bottom input bar (NOT absolutely positioned anymore) */}
            <MessageInput
              handleSendMessage={handleSendMessage}
              onPressIn={handleStartListining}
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
