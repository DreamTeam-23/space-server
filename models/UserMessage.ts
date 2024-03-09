
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: user message model schema for Space API server
 */

import mongoose from "mongoose";

export const UserMessageSchema = new mongoose.Schema({
    email: { type: String, trim: true, maxlength: [255, 'title char limit is 80'] },
    content: { type: String, maxlength: [40000, 'content char limit is 10000'] },
    createDate: { type: Date, required: true, default: Date.now },
    userMessageId: { type: Number, required: [true, 'userMessageId is required'] }
});

const UserMessage = mongoose.models.UserMessage || mongoose.model('UserMessage', UserMessageSchema);
export default UserMessage;