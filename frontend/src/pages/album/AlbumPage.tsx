import { useMusicStore } from "@/store/useMusicStore"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Clock, Play } from "lucide-react"
  


const AlbumPage = () => {
    
    const {id}=useParams()
  const {fetchAlbumById,currentAlbum} =  useMusicStore()
  useEffect(() => {
    console.log("albumId:", id);
  if (id) {
    try {
      fetchAlbumById(id)
    } catch (error) {
      console.error("Greška pri fetchovanju albuma:", error)
    }
  }
}, [id, fetchAlbumById])

  return (
    <div className="h-full w-full">
    <ScrollArea className="h-full w-full ">
      <div className="relative min-h-screen">
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900" />
        {/* Ovde ide tvoj sadržaj */}
      <div className="relative z-10  ">
        <div className="flex gap-6 justify-center items-center mx-auto  ">
  <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title} className=" mt-10 w-[240px] h-[240px]"/>
  <div className=" text-white flex flex-col justify-center text-7xl font-bold">
    <span >{currentAlbum?.title}</span>
  </div>
</div>
      </div>
      {/*controles button*/}
  	<div className="flex justify-start  mt-4 ml-5" >
        <Button  size="icon" className="z-10 w-14 h-14  rounded-full bg-white hover:bg-green-400 flex items-center justify-center">
            <Play className="w-10 h-10" />
        </Button>

    </div>
      {/*table*/}
    <div className="z-10 grid grid-cols-[16px_2fr_2fr_1fr] text-white text-sm font-semibold px-6 mt-6 mb-2">
  <div >#</div>
  <div>Title</div>
  <div>Release Date</div>
  <div className="flex z-10">
    <Clock className="w-5 h-5" />
  </div>
</div>

<div className='px-6 z-10'>
  <div className='space-y-2 py-4 z-10'>
    {currentAlbum?.songs.map((song, index) => (
      <div
        key={song._id}
        className="z-20 grid grid-cols-[16px_2fr_2fr_1fr]  text-sm text-zinc-400 hover:bg-zinc-200 rounded-md cursor-pointer"
      >
        <div className=" z-10 flex items-center justify-center">{index + 1}</div>
        <div className=" z-10 flex items-center">
          <img src={song.imageUrl} alt={song.title} className="size-10 rounded-sm" />
          <span className=" z-10 text-white ml-2">{song.title}</span>
        </div>
        <div className="flex z-10">{song.createdAt.split("T")[0]}</div>
        <div className="flex z-10">{song.duration}</div>
      </div>
    ))}
  </div>
</div>
	
  
  </div>
    </ScrollArea>
  </div>
    
  )
}

export default AlbumPage