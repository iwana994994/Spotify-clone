import { axiosInstance } from '@/lib/axios';
import type { Album, Song } from '@/types';
import { toast } from 'react-hot-toast';


import {create} from 'zustand';

interface MusicStore{
songs:Song[],
albums:Album[],
isLoaded:boolean,
currentAlbum:Album|null
fetchAlbums:()=>Promise<void>
fetchAlbumById:(id:string)=>Promise<void>
FeaturedSongs:Song[],
MadeForYouSongs:Song[],
TrendingSongs:Song[],
fetchFeaturedSongs:()=>Promise<void>,
fetchMadeForYouSongs:()=>Promise<void>,
fetchTrendingSongs:()=>Promise<void>
fetchSongs:()=>Promise<void>
deleteSong:(id:string)=>Promise<void>
deleteAlbum:(id:string)=>Promise<void>

}
export const useMusicStore = create<MusicStore>((set) => ({
    isLoaded: false,
    albums: [],
    songs: [],
    currentAlbum: null,
    FeaturedSongs:[],
    MadeForYouSongs:[],
    TrendingSongs:[],

    deleteSong:async(id:string)=>{
        set({ isLoaded: true });
        try {
           await axiosInstance.delete(`/admin/songs/${id}`);
           
           set(state=>({
            songs:state.songs.filter(song=>song._id!==id)
            
        }));
          toast.success('Song deleted successfully');
      
             
        } catch (error) {
            console.error('Error fetching albums:', error);
            toast.error('Error deleting song');
           
        } finally {
            set({ isLoaded: false });
        }
    },
    deleteAlbum: async (id:string) => {
		set({ isLoaded: true});
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === id ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error) {
            console.log("Error in deleteSong", error);
			toast.error("Failed to delete album " );
		} finally {
			set({ isLoaded: false });
		}
	},

    fetchSongs:async()=>{
        set({ isLoaded: true });
        try {
            const response = await axiosInstance.get('/songs');
           console.log("response",response.data);
            set({ songs: response.data });
             console.log("Succesful response:", response.data);
        } catch (error) {
            console.error('Error fetching albums:', error);
           
        } finally {
            set({ isLoaded: false });
        }


    },


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
fetchFeaturedSongs:async()=>{
    set({ isLoaded: true });
    try {
        const response = await axiosInstance.get('/songs/featured');
       console.log("response",response.data);
        set({ FeaturedSongs: response.data });
         console.log("Succesful response:", response.data);
    } catch (error) {
        console.error('Error fetching albums:', error);
       
    } finally {
        set({ isLoaded: false });
    }
},
fetchMadeForYouSongs:async()=>{
    set({ isLoaded: true });
    try {
        const response = await axiosInstance.get('/songs/made-for-you');
           console.log("response",response.data);
        set({ MadeForYouSongs: response.data });
         console.log("Succesful response:", response.data);
    } catch (error) {
        console.error('Error fetching albums:', error);
       
    } finally {
        set({ isLoaded: false });
    }
},
fetchTrendingSongs:async()=>{
    set({ isLoaded: true });
    try {
        const response = await axiosInstance.get('/songs/trending');
           console.log("response",response.data);
        set({ TrendingSongs: response.data });
        console.log("Succesful response:", response.data);
    } catch (error) {
        console.error('Error fetching albums:', error);
       
    } finally {
        set({ isLoaded: false });
    }
}

}))