import TopBar from "@/components/TopBar";
import useChatStore from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react"
import { useEffect } from "react";
import UserList from "./chatComponents/UserList.tsx";


const ChatPage = () => {
  const {user}=useUser();
  const {fetchUsers, }=useChatStore()
  useEffect(() => {
    if(user) fetchUsers();
  },[ fetchUsers, user]);
  return (
   
   <main className="h-full rounded-lg bg-zinc-900">
     <TopBar/>
    <div className="grid lg:grid-cols-1 md:grid-cols-1]  sm:grid-cols-1 bg-zinc-800"></div>
   <UserList/>
   </main>
  )
}

export default ChatPage