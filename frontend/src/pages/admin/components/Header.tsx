
import { UserButton } from "@clerk/clerk-react"
import { Link } from "react-router-dom"


const Header = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <div>
        <Link to="/" className="text-2xl font-bold items-start">
           <img src="../../../../spotify-cat-logo-512x512.png" alt="Logo" className="w-10 h-10 ml-2" />
           <h1>Spotify</h1>
           </Link>
     

      </div>
      <h1 className="text-2xl font-bold">Admin Dashbord</h1>
      <UserButton/>
    </div>
  )
}

export default Header