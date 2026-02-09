import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();
function connectDB(){
    try{
        mongoose.connect(process.env.MONGODB_URL as string);
        console.log("DB connected");

    } catch{
        console.log("DB not connected");
        return false;

    }
    
}

export default connectDB;