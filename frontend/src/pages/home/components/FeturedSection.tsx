import { useMusicStore } from "@/store/useMusicStore.tsx"

import { useEffect } from "react";
import PlayButton from "./PlayButton.tsx";


const FeturedSection = () => {
    const {fetchFeaturedSongs,FeaturedSongs}=useMusicStore()

    useEffect(() => {
        fetchFeaturedSongs();
      },[fetchFeaturedSongs]);
  return (
    <div>
        <div className="flex gap-2  ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 bg-neutral-950">
              {FeaturedSongs.map((song) => (
                 <div className="group  hover:bg-gray-500 flex items-center bg-grey-700 rounded-lg hover:bg-grey-800 p-4" key={song._id}>
               <img src={song.imageUrl} alt={song.title} className="w-40 h-40 rounded-lg" />
                <span className="text-white text-2xl font-bold">{song.title}</span>
                <PlayButton song={song} />
                </div>))}
        
        </div>
    </div>
    </div>
  )
}

export default FeturedSection