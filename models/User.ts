
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: User model schema for Space web server
 */

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: { type: Number, required: [true, 'userId is required'] },
    email: { type: String, required: [true, 'email is required'], maxlength: [255, 'email char limit is 255'] },
    password: { type: String, required: [true, 'password is required'], maxlength: [80, 'password char limit is 80'] },
    username: { type: String, required: [true, 'username is required'], trim: true, maxlength: [80, 'username char limit is 80'] },
    createDate: { type: Date, required: true, default: Date.now },
    badges: { type: Number, required: [true, 'badges is required'] },
})

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
