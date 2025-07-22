import { axiosInstance } from '@/lib/axios';
import type { Message, User } from '@/types';
import { create } from 'zustand';
import { io } from 'socket.io-client';
import {Socket} from 'socket.io-client';


interface ChatStore {
  users: User[];
  isLoading: boolean;
  error: string | null;
  socket: Socket | null;
  isConneted: boolean;
  onlineUsers: Set<string>;
  usersActivities: Map<string, string>;
  message:Message[];
  initSocket:(userId:string) => Promise<void>;
  disconnectSocket:() => void;
  sentMessage:(senderId:string,receiverId:string,message:Message) => void;
  fetchUsers: () => Promise<void>;
  fetchMessages: (userId:string) => Promise<void>;
  selectedUser:User|null
  setSelectedUser:(user:User|null) => void
}

const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/"
const socket=io(baseUrl,{autoConnect: false,withCredentials: true});
const useChatStore = create<ChatStore>((set,get) => ({
  users: [],
  isLoading: false,
  error: null,
  socket: null,
  isConneted: false,
  onlineUsers: new Set<string>(),
  usersActivities: new Map<string, string>(),
  message:[],
  selectedUser:null,
  setSelectedUser:(user:User|null) => {
    set({ selectedUser: user });
  },

initSocket: async (userId) => {
  if(!get().isConneted)
    socket.auth={userId}
    socket.connect()
  socket.emit('listen-connection', userId);
  socket.on('users-online', (users) => {
    set({ onlineUsers: new Set(users) }); 
  })
  socket.on('all-users-activities', (activities:[string,string][]) => {
    
    set({ usersActivities: new Map(activities) });
  })
  socket.on ('user-disconnected', (userId) => {
    set((state) => {
      const newOnlineUsers= new Set(state.onlineUsers);
     newOnlineUsers.delete(userId);
     return { onlineUsers: newOnlineUsers };
    });
  })
  socket.on('receive-message', (message:Message) => {
    set((state) => ({
      message: [...state.message, message],
    }));
    socket.on("message-sent", (message:Message) => {
      set((state) => ({
        message: [...state.message, message],
      }));
    });
  
  })
  socket.on("update-activity", ({ userId, activity }) => {
  set((state) => {
    const newUsersActivities = new Map(state.usersActivities);
    newUsersActivities.set(userId, activity);
    return { usersActivities: newUsersActivities };  // Vrati novi state ovde!
  });
});
set({  isConneted: true });

  },

  disconnectSocket: () => {
    if(get().isConneted){
    socket.disconnect();
    set({ isConneted: false });
    }
  },

  sentMessage: (senderId:string,receiverId:string,message:Message) => {
    const socket=get().socket
    if(!socket) return;
    socket.emit('send-message', { senderId, receiverId, message });
  },
  fetchMessages: async (userId:string) => {
    set({ isLoading: true, error: null });
  
    try {
      const response = await axiosInstance.get(`/users/messages/${userId}`);
      set({ message: response.data });
    } catch (error) {
        console.log(error);
      set({ error: 'Failed to fetch messages' });
    } finally {
      set({ isLoading: false });
    }
  },
  

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
