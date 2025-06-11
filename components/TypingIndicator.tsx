import { View, StyleSheet } from 'react-native';
import { MotiView } from 'moti';

const TypingIndicator = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bubble}>
        {[0, 1, 2].map((i) => (
          <MotiView
            from={{ opacity: 0.4, translateY: 0 }}
            animate={{ opacity: 1, translateY: -4 }}
            transition={{
              type: 'timing',
              duration: 300,
              delay: i * 150,
              loop: true,
            }}
            key={i}
            style={styles.dot}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  bubble: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 20,
    width: 60,
    justifyContent: 'space-between',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#6b7280',
    borderRadius: 50,
  },
});

export default TypingIndicator;
