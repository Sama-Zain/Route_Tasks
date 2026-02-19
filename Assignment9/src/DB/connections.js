import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI ,{
            serverSelectionTimeoutMS: 3000,
        });
        console.log("Connected to Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectDB;
