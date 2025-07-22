import { ScrollArea } from "@/components/ui/scroll-area"
import useChatStore from "@/store/useChatStore"

const UserList = () => {
    const {isLoading,users,setSelectedUser}=useChatStore()
  return (
    <div className="bg-neutral-600">
        <ScrollArea className="h-[80vh]">
{isLoading?
<p>Loading</p>
    :
    users.map((user)=>
    <div key={user._id} onClick={()=>setSelectedUser(user)}>
        {user.fullname}
    </div>
    



)   

}
    </ScrollArea>
  
        </div>
  )
}

export default UserList