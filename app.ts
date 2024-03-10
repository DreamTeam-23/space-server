
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: app for Space web server
 */

import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import users from "./routes/users"
import user from "./routes/user"
import connectDB from "./connect"
import usermessages from "./routes/usermessages"
import reminders from "./routes/reminders"

dotenv.config()
const app = express()
const port = process.env.PORT || 3333

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("welcome")
})

app.use("/api/users", users)
app.use("/api/user", user)
app.use("/api/user/messages", usermessages)
app.use("/api/reminders", reminders)

async function start() {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to database.");
        app.listen(port, () => console.log(`Server listening on port: ${port}`));
    }
    catch (err) {
        console.log(err)
    }
}

start()