import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

interface Props {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  onPressIn: () => Promise<void>;
  onPressOut: () => Promise<void>;
  handleStopRecognizing: () => Promise<void>;
  loading: boolean;
}

const MessageInput = ({ message, handleSendMessage, setMessage, onPressIn, onPressOut, loading }: Props) => {
  const isSendDisabled = message.trim().length === 0;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
      style={styles.keyboardAvoidingContainer}>
      <View style={styles.container}>
        {/* Mic Button */}
        <TouchableOpacity
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          className="rounded-full bg-indigo-500 p-4 "
          style={styles.iconButton}>
          <Ionicons name="mic-outline" size={22} color={'white'} />
        </TouchableOpacity>

        {/* Message Input */}
        <TextInput
          multiline
          value={message}
          onChangeText={setMessage}
          placeholder="Ask your assistant?"
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />

        {/* Send Button */}
        <TouchableOpacity
          onPress={handleSendMessage}
          disabled={isSendDisabled || loading}
          style={[
            styles.sendButton,
            { backgroundColor: isSendDisabled ? '#a5b4fc' : '#4f46e5' }, // gray-300 or indigo-600
          ]}>
          <AntDesign
            name="arrowup"
            className="font-bold"
            size={16}
            color={isSendDisabled ? '#ffffff' : '#ffffff'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#e5e7eb', // Tailwind gray-200
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f3f4f6',
    fontSize: 17,
    marginHorizontal: 10,
    color: '#111827',
    maxHeight: 120,
  },
  iconButton: {
    padding: 6,
  },
  sendButton: {
    padding: 10,
    borderRadius: 50,
  },
});
