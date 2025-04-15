import mongoose from "mongoose";


export const dbConnect = async() => {
    try{
        await mongoose.connect(Bun.env.MONGO_URI!)
   console.log("database  connected ")
    }catch(error){
        console.log("database connection failed ")
        process.exit(1);
    }
} 