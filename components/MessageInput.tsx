import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
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

const MessageInput = ({
  message,
  handleSendMessage,
  setMessage,
  onPressIn,
  onPressOut,
  loading,
}: Props) => {
  const inputRef = useRef<TextInput>(null);
  const isSendDisabled = message.trim().length === 0;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
      style={[
        styles.keyboardAvoidingView,
        isFocused && { marginBottom: 308 }, // push it up when focused
      ]}>
      <View style={styles.container}>
        {/* Mic Button */}
        <TouchableOpacity
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={[styles.iconButton, { backgroundColor: '#6366f1' }]}>
          <Ionicons name="mic-outline" size={22} color={'white'} />
        </TouchableOpacity>

        {/* Message Input */}
        <TextInput
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
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
          style={[styles.sendButton, { backgroundColor: isSendDisabled ? '#a5b4fc' : '#4f46e5' }]}>
          <AntDesign name="arrowup" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
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
    borderColor: '#e5e7eb',
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
    padding: 10,
    borderRadius: 50,
  },
  sendButton: {
    padding: 10,
    borderRadius: 50,
  },
});
