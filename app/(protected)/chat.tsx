import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageInput from '~/components/MessageInput';
import useAuthStore from '~/store/AuthStore';
import { useVoiceRecognition } from '~/hooks/useVoiceInput';
import { PermissionsAndroid } from 'react-native';
import useChatStore, { ChatHistory } from '~/store/ChatStore';
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

const AskYourAI = () => {
  const { session } = useAuthStore();
  const { getChatHistory, loading, sendMessage } = useChatStore();

  const [historyMessages, setHistoryMessages] = useState<ChatHistory[]>([]);

  const { startRecognizing, stopRecognizing } = useVoiceRecognition();
  const handleSendMessage = async () => {
    if (message.trim() === '') {
      Alert.alert('Message cannot be empty');
      return;
    }

    const userMsg: ChatHistory = {
      userid: session?.user.id!,
      role: 'user',
      content: message,
      created_at: new Date(),
      id: `local-${Date.now()}`, // temporary ID
      session_id: undefined,
    };

    const thinkingMsg: ChatHistory = {
      userid: 'assistant',
      role: 'assistant',
      content: '...',
      created_at: new Date(),
      id: `thinking-${Date.now()}`,
      session_id: undefined,
    };

    // Optimistic update
    setHistoryMessages((prev) => [...prev, userMsg, thinkingMsg]);
    setMessage('');

    try {
      const { reply } = await sendMessage(session?.user.id!, message, null);
      setHistoryMessages((prev) =>
        prev.map((msg) =>
          msg.id === thinkingMsg.id
            ? {
                ...msg,
                content: reply,
                created_at: new Date(),
                id: `ai-${Date.now()}`,
              }
            : msg
        )
      );
    } catch (error) {
      Alert.alert('Error sending message', String(error));
      // Optionally remove the thinking message if error
      setHistoryMessages((prev) => prev.filter((msg) => msg.id !== thinkingMsg.id));
    }
  };

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

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [historyMessages.length]);

  useEffect(() => {
    const fetchHistory = async () => {
      const messages = await getChatHistory(session?.user.id!, null);
      setHistoryMessages(messages);
    };

    if (session?.user.id) fetchHistory();
  }, [session?.user.id]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={flatListRef}
            data={historyMessages}
            automaticallyAdjustKeyboardInsets={true}
            ListHeaderComponent={
              <View style={{ flex: 1 }}>
                <View className="px-4 pt-2">
                  <Text className="mb-2 text-4xl font-bold tracking-wider text-indigo-500">
                    Your Personal AI Assistant
                  </Text>
                </View>
              </View>
            }
            ListEmptyComponent={
              <View style={{ paddingTop: 100, alignItems: 'center' }}>
                <Text style={{ color: '#9ca3af', fontSize: 16 }}>
                  No messages yet. Start the conversation!
                </Text>
              </View>
            }
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <DisplayMessages message={item} />}
            contentContainerStyle={{
              paddingHorizontal: 12,
              paddingBottom: 360, // Reduced padding since input will push content up
            }}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            showsVerticalScrollIndicator={false}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
          />

          {/* Message input now flows naturally in the layout */}
          <MessageInput
            handleSendMessage={handleSendMessage}
            onPressIn={handleStartListining}
            onPressOut={handleStopRecognizing}
            message={message}
            loading={loading}
            setMessage={setMessage}
            handleStopRecognizing={handleStopRecognizing}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AskYourAI;
