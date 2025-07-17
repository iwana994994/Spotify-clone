import { axiosInstance } from "@/lib/axios";

import { useAuth } from "@clerk/clerk-react";

import { Loader } from "lucide-react";

import {  useEffect, useState } from "react";


const updateApiToken = async (token:string |null) => {
    if(token){
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else{
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
    
}
const AuthProvaider = ({children}:{children:React.ReactNode}) => {
    const {getToken}=useAuth();
    const [loading, setloading] = useState(true)
  

    useEffect(() => {
        
    const inithAuth = async () => {
        try {
            const token = await getToken();
            await updateApiToken(token);
           
           console.log("Auth initialized successfully!");
    }
      
                
    
    catch(error)
    {console.error("Error initializing auth:", error);}
    finally {
            setloading(false);
        }
};
  inithAuth();   
    }, [getToken]);
if(loading){
    return (
    <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin size-8 text-emerald-500"></Loader>
    </div>)
}
    return (<>{children}</>)
}


export default AuthProvaider;