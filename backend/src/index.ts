import express from "express";
import dotenv from "dotenv"
import connectDB from "../config/database"

dotenv.config()
connectDB()

const app = express();

const port = process.env.SERVER_PORT

const data = {
    status: 200,
    message: "Server is Active"
}

app.get('/health', (req, res) => {
    console.log("Server Health is fine")
    return res.status(200).json(data)
})

app.listen(port, () => {
    console.log("Server is listening on PORT:", port);
})