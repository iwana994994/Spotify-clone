import { Card, CardContent } from "@/components/ui/card"
import { axiosInstance } from "@/lib/axios"
import { useUser } from "@clerk/clerk-react"

import { Loader } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const AuthCallbackPage = () => {
//If user is loading for first time, saved him in MangoDB 
const navigate = useNavigate();
const {isLoaded,user}=useUser();
useEffect(() => {
  const syncUser= async () => {
try {
  if(!isLoaded|| !user) return;

  //Put user data in MongoDB
   await axiosInstance.post("/auth/callback", {
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  imageUrl: user.imageUrl,
}).then(res => {
  console.log("📡 Backend response:", res.data);
}).catch(err => {
  console.error("❌ Backend greška:", err.response?.data || err.message);
});
} catch (error) {
    console.error("Error syncing user:", error);
  }
  finally {
    navigate("/");
  }
}
  //If user is loaded, save him in MongoDB
  if(isLoaded && user)
  syncUser();
console.log("Clerk korisnik:", user);
}, [isLoaded, user,navigate]);


  return (
    <div >
      <Card className="max-w-md mx-auto mt-20 p-10 bg-zinc-700 border-zinc-800">
        <CardContent className="flex flex-col items-center space-y-5">
          <Loader className="w-6 h-6 animate-spin text-wite" />
          <p className="text-center text-wite">Redirecting...</p>

        </CardContent>
      </Card>
    </div>
  )
}

export default AuthCallbackPage