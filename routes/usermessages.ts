
import express from "express"
import { createUserMessage } from "../controller"

const usermessages = express.Router()

usermessages.route('/').post(createUserMessage)

export default usermessages 