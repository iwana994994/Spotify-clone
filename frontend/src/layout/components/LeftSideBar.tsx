import { SignedIn} from '@clerk/clerk-react'
import { HomeIcon, MessageCircle, MessageCircleCodeIcon } from 'lucide-react'

import { Link } from 'react-router-dom'

const LeftSideBar = () => {
  return (
    <div className='p-2'>
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

    // Library meny
    <div>

    </div>

    </div>
  )
}

export default LeftSideBar