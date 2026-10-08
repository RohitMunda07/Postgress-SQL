import express, { json } from "express"

const app = express();

app.use(express.json({ limit: '20kb' }))

// routes
import userRoute from "./Routes/user.route.js"
import postRoute from "./Routes/post.route.js"

app.use("/api/v1/users", userRoute)
app.use("/api/v1/post", postRoute)

export default app;