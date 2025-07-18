import type { Song } from '@/types';
import {create } from 'zustand';


interface PlayStore{
    currentSong:Song|null,
    isPlaying:boolean,
    queue:Song[],
    currentIndex:number,

    initializeQueue:(songs:Song[])=>void,
    setCurrentSong:(song:Song|null)=>void,
    playAlbum:(album:Song[],startIndex?:number)=>void,
    togglePlay:()=>void,
    nextSong:()=>void,
    prevSong:()=>void,
}

export const usePlayerStore=create<PlayStore>((set,get)=>({
    currentSong:null,
    isPlaying:false,
    queue:[],
    currentIndex:-1,

    initializeQueue:(songs:Song[])=>{
        set({queue:songs,
            currentSong:get().currentSong || songs[0],
            currentIndex:get().currentIndex === -1 ? 0 : get().currentIndex
        })
    },


      playAlbum:(songs:Song[],startIndex=0)=>{

        if(songs.length ===0) return
            const song= songs[startIndex];
            set({queue:songs,
                currentSong:song,
                currentIndex:startIndex,
                isPlaying:true
            })
            
      },


    setCurrentSong:(song:Song|null)=>{
if(!song)return 
const songIndex=get().queue.findIndex((s)=>s._id===song._id);
        set({currentSong:song,
            isPlaying:true,
            currentIndex:songIndex===-1 ?songIndex:get().currentIndex

        })
    },



  
    togglePlay:()=>{

        const willPlay=!get().isPlaying;
        set({isPlaying:willPlay})
    }, 


    nextSong:()=>{
        const{currentIndex,queue}=get();
        const nextIndex=currentIndex+1

        if(nextIndex<queue.length){
            
        
        const nextSong=queue[nextIndex];
        set({currentSong:nextSong,
            isPlaying:true,
            currentIndex:nextIndex
        })}else{
            set({isPlaying:false});
        }
    },

    prevSong:()=>{
         const{currentIndex,queue}=get();
        const previusIndex=currentIndex-1
        
        if(previusIndex>queue.length){
            
        
        const nextSong=queue[previusIndex];
        set({currentSong:nextSong,
            isPlaying:true,
            currentIndex:previusIndex
        })}
        else{
            set({isPlaying:false});
        }
    }
   
}))