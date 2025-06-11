import { View, Text } from 'react-native';
import { ChatHistory } from '~/store/ChatStore';

interface IDisplayMessagesProps {
  message: ChatHistory;
}

const formatTime = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const isAM = hours < 12;

  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const period = isAM ? 'AM' : 'PM';

  return `${displayHours}:${paddedMinutes} ${period}`;
};

const DisplayMessages = ({ message }: IDisplayMessagesProps) => {
  const isUser = message.role === 'user';
  const formattedTime = formatTime(new Date(message.created_at));

  return (
    <View className={`w-full flex-row px-3 py-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser ? 'rounded-tr-md bg-blue-500' : 'rounded-tl-md bg-gray-100'
        }`}>
        <Text className={`text-base leading-5 ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </Text>
        <Text className={`mt-1 text-xs ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

export default DisplayMessages;
