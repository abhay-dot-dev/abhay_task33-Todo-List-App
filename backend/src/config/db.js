import mongoose from 'mongoose'

// to connect to DB, use this function
export async function connectDB() {
    const MONGODB_URI = process.env.MONGODB_URI;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Databse connected...");
    } catch (err) {
        throw err;
    }

}

// to disconnect from DB, use this function
export async function disconnectDB() {
    await mongoose.connection.close();
}