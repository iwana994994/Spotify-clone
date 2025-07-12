import mongo from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
export const connectDB = async () => {
    try {
       const con= await mongo.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected successfully ${con.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit the process with failure
    }
}