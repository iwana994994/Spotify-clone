import useChatStore from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { User } from "lucide-react";
import { useEffect } from "react";

const FriendsActivity = () => {
  const { fetchUsers, users } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);

  return (
    <div className="h-full bg-zinc-800 rounded-lg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center p-5 gap-2">
        <User className="w-8 h-8 text-white" />
        <h2 className="text-lg font-semibold text-white">Friends Activity</h2>
      </div>

      {/* Scrollable User List */}
      <ScrollArea className="px-5 pb-5">
        <div className="flex flex-col gap-y-2">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-4 rounded-lg bg-zinc-700"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative w-8 h-8">
               <Avatar className="size-8">
                     <AvatarImage
                   src={user.imageUrl}
                  alt={user.fullname}
                  className="rounded-full"
                                      />
               </Avatar>

  {/* Status kružić */}
  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-zinc-800" />
</div>

                  <div className="flex flex-col text-sm leading-tight">
                    <span>{user.fullname}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-sm">No friends online.</p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default FriendsActivity;
