import { View, Text, StyleSheet } from 'react-native';
import { ChatHistory } from '~/store/ChatStore';

interface IDisplayMessagesProps {
  message: ChatHistory;
}

const DisplayMessages = ({ message }: IDisplayMessagesProps) => {
  const isUser = message.role === 'user';

  return (
    <View
      style={[styles.messageContainer, isUser ? styles.userContainer : styles.assistantContainer]}>
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.assistantContainer]}>
        <Text style={isUser ? styles.userText : styles.assitantText}>{message.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userBubble: {
    backgroundColor: '#3b82f6', // blue-500
    borderTopRightRadius: 4,
  },
  assitantBubble: {
    backgroundColor: '#f3f4f6', // gray-100
    borderTopLeftRadius: 4,
  },
  userText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
  assitantText: {
    color: '#1f2937', // gray-800
    fontSize: 16,
    lineHeight: 22,
  },
});

export default DisplayMessages;
