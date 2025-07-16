import { axiosInstance } from '@/lib/axios';
import type { Album, Song } from '@/types';


import {create} from 'zustand';

interface MusicStore{
songs:Song[],
albums:Album[],
isLoaded:boolean,
currentAlbum:Album|null
fetchAlbums:()=>Promise<void>
fetchAlbumById:(id:string)=>Promise<void>
}
export const useMusicStore = create<MusicStore>((set) => ({
    isLoaded: false,
    albums: [],
    songs: [],
    currentAlbum: null,

  fetchAlbums:async () => {
        set({ isLoaded: true });
        try {
            const response = await axiosInstance.get('/albums');
           
            set({ albums: response.data });
        } catch (error) {
            console.error('Error fetching albums:', error);
           
        } finally {
            set({ isLoaded: false });
        }
    },
fetchAlbumById:async(id:string)=> {
    set({ isLoaded: true });
try {
    const response = await axiosInstance.get(`/albums/${id}`);
   console.log("Backend response:", response.data); // ✅ Dodaj ovo
    set({currentAlbum:response.data });
} catch (error) {
    console.error('Error fetching albums:', error);
   
} finally {
    set({ isLoaded: false });
}
    
},

}))