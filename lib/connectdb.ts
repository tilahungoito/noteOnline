import mongoose from "mongoose";

const connectdb = async () =>
{
    try
    {
        if (!process.env.mongoDB_URI)
        {
            throw new Error("Environment variable 'mongoDB_URI' is not defined");
        }
        await mongoose.connect(process.env.mongoDB_URI, {

            serverSelectionTimeoutMS: 10000, // Wait 10 seconds before timing out
        });
        console.log("MongoDB connected successfully");
    } catch (error: any)
    {
        console.error("MongoDB connection error:", error.message);
        throw new Error(`MongoDB connection failed: ${error.message}`);
    }
};

export default connectdb;
