import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:String,
        required: true,
    },
    resiverId:{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    }
},{timestamps: true });

const Message = mongoose.model("Message", messageSchema);
export default Message;