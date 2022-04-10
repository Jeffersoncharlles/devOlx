import mongoose from "mongoose";
import 'dotenv/config'

const login = process.env.LOGIN_MONGO
const password = process.env.PASSWORD_MONG
const db_name = process.env.DB_NAME


const connectDB = async () => {
    await mongoose.connect(
        `mongodb+srv://${login}:${password}@${db_name}mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
        {

        }
    )
        .then(() => console.log("Connect: mongoDB"))
        .catch((error) => console.log(error))
}

export { connectDB }