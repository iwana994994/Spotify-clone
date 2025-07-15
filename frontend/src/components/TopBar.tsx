import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton.tsx";

const TopBar = () => {
   const isAdmin = false;
    return (

        <div className="flex justify-between items-center sticky top-0 backdrop-blur-md  text-white p-4">
            <div className="flex items-center ">Spotify</div>
            <div className="flex items-center">
                {isAdmin && 
                <Link to={"/admin"}>
                <LayoutDashboardIcon className="w-6 h-6 mr-2" >
                    Admin Dashbord
                </LayoutDashboardIcon>
                </Link>
               }
               <SignedIn>
                   <SignOutButton/>
               </SignedIn>

               <SignedOut>
                <SignInOAuthButton/>
               </SignedOut>
            </div>
        </div>
    )



}

export default TopBar;