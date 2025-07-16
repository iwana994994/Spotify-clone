import PlayListsSkeleton from '@/components/skeletons/PlayListsSkeleton.tsx'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useMusicStore } from '@/store/useMusicStore'
import { SignedIn} from '@clerk/clerk-react'
import { HomeIcon, Library, MessageCircle} from 'lucide-react'
import { useEffect } from 'react'
 import { Link } from 'react-router-dom'


const LeftSideBar = () => {
 const {albums,isLoaded,fetchAlbums} = useMusicStore()


 useEffect(() => {
 fetchAlbums()
 }, [fetchAlbums])

 console.log({albums})



  return (
    <div className='p-2'>
    {/* Navigation links for the left sidebar */}  
   <div className="rounded-lg p-2 hover:bg-zinc-500">
  <Link to="/" className="flex items-center gap-2 text-white">
    <HomeIcon className="size-6" />
    <span className="hidden md:inline">Home</span>
  </Link>
</div>

<div className="rounded-lg p-2 hover:bg-zinc-500">
  <SignedIn>
    <Link to="/chat" className="flex items-center gap-2 text-white">
      <MessageCircle className="size-6" />
      <span className="hidden md:inline">Message</span>
    </Link>
  </SignedIn>
</div>

   {/*Library link for albums*/} 
    <div className='rounded-lg p-2 bg-gray-500'>
      <div>
     {/*Name of the library*/}
            <div className='flex items-center justify-between'>
        <Library className='size-6 mt-2' />
        <span className='text-white text-sm font-semibold hidden md:inline'>Library</span>
      </div>
      </div>

<ScrollArea className="mt-2 h-[calc(100vh-300px)]">
  <div className='space-y-2'>
    {isLoaded ? (
      <PlayListsSkeleton />
    ) : (
      albums.map((album) => (
        <Link to={`/albums/${album._id}`} key={album._id} className=' hover:bg-gray-400 flex items-center justify-between p-4 rounded-lg mb-2 bg-zinc-600'>
          
            <img src={album.imageUrl} alt={album.title} className='h-10 w-10 rounded-full' />
            <p>{album.title}</p>
        </Link>
      ))
    )}
  </div>
</ScrollArea>
    </div>
    

    </div>
  )
}

export default LeftSideBar