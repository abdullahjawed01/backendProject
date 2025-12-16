import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

async function connect() {
    try {
        let URI = process.env.DBURI 
        await mongoose.connect(URI)
        console.log("The server is connected with DB");
    } catch (error) {
        console.log(error);
    }
}
connect()