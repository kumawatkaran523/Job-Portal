import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected, DB Host "+response.connection.host);
    } catch (error) {
        console.log("Error while connecting Database ",error);
    }
}
export default connectDB;