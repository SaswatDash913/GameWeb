import mongoose, { Mongoose } from "mongoose";
import { Db_name } from "../constants.js";

const connectDataBase = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${Db_name}`)
        console.log(`Database connected!! ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("error in connection",error)
        process.exit(1)
    }
}

export default connectDataBase