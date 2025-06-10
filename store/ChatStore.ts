import { create } from 'zustand';
import { supabase } from '~/utils/supabase';
import OpenAI from 'openai';

export interface ChatHistory {
  userid: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: Date;
  id: string;
  session_id?: string;
}

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.AI_API_KEY,
});

interface AiChatStore {
  sendMessage: (
    userid: string,
    message: string,
    sessionId: string | null
  ) => Promise<{ reply: string; message: string }>;
  getChatHistory: (userid: string, sessionId: string | null) => Promise<ChatHistory[]>;
  loading: boolean;
}

const useChatStore = create<AiChatStore>((set) => ({
  loading: false,
  sendMessage: async (userid, message, sessionid) => {
    set({ loading: true });
    try {
      const { error: userError } = await supabase
        .from('conversations')
        .insert({ user_id: userid, role: 'user', content: message, session_id: sessionid });
      if (userError) throw userError;
      const response = await openai.chat.completions.create({
        model: 'deepseek/deepseek-r1:free',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      });
      const reply = response.choices[0].message.content;
      console.log(reply);
      const { error: aiError } = await supabase.from('conversations').insert({
        user_id: userid,
        role: 'assistant',
        content: reply,
        session_id: sessionid,
      });
      if (!reply) throw new Error('No response from model');

      if (aiError) throw aiError;

      return { message, reply };
    } catch (error) {
      if (error as Error) {
        throw Error(`Error while getting ai response : ${error}`);
      }
      return { reply: '', message: '' };
    } finally {
      set({ loading: false });
    }
  },
  getChatHistory: async (userid, sessionId) => {
    set({ loading: true });
    try {
      const query = supabase
        .from('conversations')
        .select('*')
        .eq('user_id', userid)
        .order('created_at', { ascending: true });
      if (sessionId) {
        query.eq('session_id', sessionId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as ChatHistory[];
    } catch (error) {
      if (error) throw error;
      return [];
    } finally {
      set({ loading: false });
    }
  },
}));

export default useChatStore;
