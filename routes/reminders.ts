


import express from "express"
import { completeReminder, createReminder, getReminders } from "../controller"

const reminders = express.Router()

reminders.route('/').post(createReminder)
reminders.route('/complete/:reminderId').post(completeReminder)
reminders.route('/:userId').get(getReminders).post()

export default reminders 