import { Text, ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Markdown
        style={markdownStyles}
        rules={{
          text: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.text}>
              {children}
            </Text>
          ),
          strong: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.strong}>
              {children}
            </Text>
          ),
          em: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.em}>
              {children}
            </Text>
          ),
          heading1: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.heading1}>
              {children}
            </Text>
          ),
          heading2: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.heading2}>
              {children}
            </Text>
          ),
          heading3: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.heading3}>
              {children}
            </Text>
          ),
          heading4: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.heading4}>
              {children}
            </Text>
          ),
          bullet_list: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.bullet_list}>
              {children}
            </Text>
          ),
          ordered_list: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.ordered_list}>
              {children}
            </Text>
          ),
          list_item: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.list_item}>
              • {children}
            </Text>
          ),
          code_inline: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.code_inline}>
              {children}
            </Text>
          ),
          code_block: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.code_block}>
              {children}
            </Text>
          ),
          fence: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.fence}>
              {node.content}
            </Text>
          ),
          paragraph: (node, children, parent, styles) => (
            <Text key={node.key} selectable style={styles.paragraph}>
              {children}
            </Text>
          ),
        }}>
        {content}
      </Markdown>
    </ScrollView>
  );
};

export default MarkdownViewer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});

const markdownStyles = StyleSheet.create({
  text: { fontSize: 16, color: '#333' },
  strong: { fontWeight: 'bold', color: '#000' },
  em: { fontStyle: 'italic' },
  heading1: { fontSize: 26, fontWeight: 'bold', marginBottom: 8 },
  heading2: { fontSize: 22, fontWeight: 'bold', marginBottom: 6 },
  heading3: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  heading4: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  bullet_list: { marginLeft: 10, marginBottom: 6 },
  ordered_list: { marginLeft: 10, marginBottom: 6 },
  list_item: { fontSize: 16, marginBottom: 4 },
  code_inline: { fontFamily: 'Courier', backgroundColor: '#eee', padding: 2 },
  code_block: { fontFamily: 'Courier', backgroundColor: '#eee', padding: 8, marginBottom: 6 },
  fence: { fontFamily: 'Courier', backgroundColor: '#eee', padding: 8, marginBottom: 6 },
  paragraph: { fontSize: 16, marginBottom: 8 },
});
