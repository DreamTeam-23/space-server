
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: Reminder model schema for Space web server
 */

import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema({
    category: { type: String, required: [true, 'category is required'], maxlength: [255, 'email char limit is 255'] },
    title: { type: String, required: [true, 'title is required'], maxlength: [80, 'password char limit is 80'] },
    createDate: { type: Date, required: true, default: Date.now },
    completed: { type: Boolean, required: true, default: false },
    userId: { type: Number, required: [true, 'userId is required'] },
    reminderId: { type: Number, required: [true, 'reminderId is required'] },
})

const Reminder = mongoose.models.Reminder || mongoose.model('Reminder', ReminderSchema);
export default Reminder;
