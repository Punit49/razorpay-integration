import config from "./config.js";
import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.log(`Error in connecting to DB - ${error.message}`)
    }
}

export default connectDB;