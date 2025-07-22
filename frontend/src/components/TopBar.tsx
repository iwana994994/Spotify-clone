import {  SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButton from "./SignInOAuthButton.tsx";

import { useAuthStore } from "@/store/useAuthStore.tsx";

const TopBar = () => {
   const isAdmin = useAuthStore();
    return (

        <div className="flex justify-between items-center sticky top-0 backdrop-blur-md  text-white p-4">
            <div className="flex items-center text-2xl font-bold gap-2 ">
                <img src="../../../../spotify-cat-logo-512x512.png" alt="Logo" className="w-10 h-10 ml-2" />
               <h1>Spotify</h1>
            </div>
            <div className="flex items-center ">
                {isAdmin && 
                <Link to={"/admin"} className="rounded-md bg-gray-600 hover:bg-slate-500 flex items-center p-4  m-2 cn(buttonVariante(variand:outline))">
                <LayoutDashboardIcon className="w-6 h-6 mr-2 " />
                  Admin Dashbord
               
                </Link>
               }
              

               <SignedOut>
                <SignInOAuthButton/>
               </SignedOut>
               <UserButton/>
            </div>
        </div>
    )



}

export default TopBar;