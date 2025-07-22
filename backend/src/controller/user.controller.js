import User from "../models/user.model.js";
import Message from "../models/message.model.js";
export const getAllUsers =async (req, res,next) => {

try {
     const currentUser = req.auth();
    const users = await User.find({clerkId: {$ne: currentUser}})
    res.status(200).json(users);
}
catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
    next(error);
}

}

export const getAllMessages =async (req, res,next) => {
    

     try {
         const myId= req.auth.userId; // 👈 uzmi userId iz req.auth
     const userId = req.params.id; // 👈 uzmi userId iz req.params.id

     const messages = await Message.find(
        {$or:[{senderId:myId},{receiverId:userId},
            {senderId:userId},{receiverId:myId}
        ]}).sort({createdAt:1})
     res.status(200).json(messages);
        
     } catch (error) {
        next(error);
        
     }
}