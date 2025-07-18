import type { Song } from "@/types"
import PlayButton from "./PlayButton";

type SectionGridProps = {
    title: string,
    songs: Song[]
}

const SectionGrid = ({title,songs}:SectionGridProps) => {
    console.log(songs,title);


  return (
    <div>
        <span className="text-white text-2xl font-bold flex items-center m-7">{title}</span>
        <div className="flex gap-2  ">
            
            {songs.map((song) => ( 
                <div className="group  hover:bg-gray-500  items-center bg-grey-700 rounded-lg hover:bg-grey-800 p-4" key={song._id}>
                <img src={song.imageUrl} alt={song.title} className="w-60 h-50 rounded-lg" />
                <span className="text-white text-2xl font-bold">{song.title}</span>
                <PlayButton song={song} />
                </div>
                )
            )}

                </div>
        </div>
 
  )
}

export default SectionGrid