import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';

interface AuthStore {
    isLoaded: boolean,
    isAdmin: boolean,
    error: string | null,
    checkAdmin: () => Promise<void>
    reset: () => void
    
}
export const useAuthStore = create<AuthStore>((set) => ({
    isLoaded: false,
    isAdmin: false,
    error: null,

    checkAdmin: async () => {
        set({ isLoaded: true });
        try {
            const response = await axiosInstance.get('/admin/checkAdmin');
         
            set({ isAdmin: response.data.admin });
            console.log("admin is succes")
        } catch (error) {
            console.error('Error checking admin status:', error);
            console.log("in useAuthStore is in error");
            set({ error: 'Failed to check admin status' });
        } finally {
            set({ isLoaded: false });
        }
    },
    reset: ()=>{ set({ isLoaded: false, isAdmin: false, error: null })}


}));