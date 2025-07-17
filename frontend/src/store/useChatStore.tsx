import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface ChatStore {
  users: string[];
  fetchUsers: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const useChatStore = create<ChatStore>((set) => ({
  users: [],
  isLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/users');
      set({ users: response.data });
    } catch (error) {
        console.log(error);
      set({ error: 'Failed to fetch users' });
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useChatStore;
