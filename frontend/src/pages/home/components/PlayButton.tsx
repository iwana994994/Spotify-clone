import { Button } from "@/components/ui/button"
import { usePlayerStore } from "@/store/usePlayerStore"
import type { Song } from "@/types"
import { Pause, Play } from "lucide-react"


const PlayButton = ({song}:{song:Song}) => {

    const {currentSong,isPlaying,togglePlay,setCurrentSong}=usePlayerStore()
    const isCurrentSong=currentSong?._id === song._id
    const handlePlay = () => {
        if (currentSong && currentSong._id === song._id) {
          togglePlay();
        }
        else {setCurrentSong(song)}
    }



  return (
    
<Button onClick={handlePlay} className={`bg-green-400 hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center ${isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
    {isPlaying && currentSong?._id === song._id 
    ?
    (<Pause className="w-6 h-6 text-back" />)
    :
    (<Play className="w-6 h-6 text-back" />)
   }
    
    
    </Button>

   
  )
}

export default PlayButton