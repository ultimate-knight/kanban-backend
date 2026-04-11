import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const dbConnect = async (): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string)
        console.log("Mongodb connected")
    } catch (error) {
        console.log("error", error)
    }
}

export default dbConnect
