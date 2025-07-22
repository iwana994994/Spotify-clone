import {Server} from 'socket.io';
import Message from '../models/message.model.js';

export const initializeSockets = (server) => {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
            credentials: true
        }
    });
    const userSocket= new Map()
    const userActivities= new Map()

    io.on("listen-connection", (socket) => {
        socket.on("connect", () => {
        //  1. user Conected
        userSocket.set(userId,socket.id)
        userActivities("idle",userId)
       
        //Server broadcast user connected to all users
        io.emit("user-connected",userId)
        //this user want to see who else is online, so everyone emit there online keys

        socket.emit("online-users",Array.from(userSocket.keys()))

        io.emit("all-users-activities",Array.from(userActivities.entries()))
        })

        //2. User started listen music  //what user does , 
        socket.on("listen-music",({userId,activity}) => {
          userActivities.set(userId,activity)

            io.emit("this-user-listening",{userId,activity})  
        })
            //Send message 
            socket.on("send-message",async (data) => {
                try {
                const {userId, resiverId,message}=data
                const newMessage = await Message.create({
                    senderId:userId,
                    resiverId:userId,
                    content:message
                })
               //if resver is online
               const resiverSocker= userSocket.get(resiverId)
               if(resiverSocker){
                io.to(resiverSocker).emit("new-message",newMessage)
               }
               //notifice sender
               socket.emit("message-send",newMessage)
            }
            
               catch (error) {
                console.error("Error sending message:", error);
                socket.emit("message-error", { message: "Error sending message" });
              }
     } )
     //user disconneted
     socket.on("disconnect",() => {
        let disconnectedUser;
      for (const [userId,socketId] of userSocket.entries()){
        if(socket.id===socketId){
            disconnectedUser=userId
            userSocket.delete(userId)
            userActivities.delete(userId)
            break;
        }
      }
      if(disconnectedUser)   io.emit("user-disconnected",disconnectedUser)
     })
         
           
        

    })




    

}