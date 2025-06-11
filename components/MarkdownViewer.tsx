import { StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface MarkdownViewerProps {
  content: string;
}

const MarkdownViewer = ({ content }: MarkdownViewerProps) => {
  return <Markdown style={markdownStyles}>{content}</Markdown>;
};

export default MarkdownViewer;

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
