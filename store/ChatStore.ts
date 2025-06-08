import { create } from 'zustand';
import { supabase } from '~/utils/supabase';

interface ChatHistory {
  userid: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: Date;
  id: string;
  session_id: string;
}

interface AiChatStore {
  sendMessage: (userid: string, message: string) => Promise<void>;
  getChatHistory: (userid: string, sessionId: string) => Promise<ChatHistory[]>;
  loading: boolean;
}

const useChatStore = create<AiChatStore>((set) => ({
  loading: false,
  sendMessage: async (userid, message) => {
    set({ loading: true });
    try {
    } catch (error) {
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
