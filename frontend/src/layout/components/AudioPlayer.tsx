import { usePlayerStore } from "@/store/usePlayerStore.tsx";

import { useEffect, useRef } from "react";


const AudioPlayer = () => {

const audioRef = useRef<HTMLAudioElement>(null);
const previusSong= useRef<string|null>(null)

const {isPlaying,currentSong,nextSong}=usePlayerStore()

useEffect(() => {
    //isPlaying or pause
    if(isPlaying) audioRef.current?.play()
    else audioRef.current?.pause()
}, [isPlaying])
    

useEffect(() => {

    //handging when song end
    const audio=audioRef.current;

     const handleEndedSong=()=>{
      nextSong();
    }

    audio?.addEventListener("ended",handleEndedSong)

    return ()=>{audio?.removeEventListener("ended",handleEndedSong)}

}, [nextSong])

//handle Song change
useEffect(() => {
    if(!currentSong || !audioRef.current)return
    const audio=audioRef.current;

    const isChangedSong=currentSong?.audioUrl!==previusSong.current;
    if(isChangedSong){
        audio.src=currentSong?.audioUrl;
        audio.currentTime=0;
        previusSong.current=currentSong?.audioUrl
           if(isPlaying) audio.play();
    }

}, [currentSong,isPlaying])


  return (
    <audio ref={audioRef}/>
  )
}

export default AudioPlayer