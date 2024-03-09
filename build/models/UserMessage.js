"use strict";
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: user message model schema for Space API server
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMessageSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserMessageSchema = new mongoose_1.default.Schema({
    email: { type: String, trim: true, maxlength: [255, 'title char limit is 80'] },
    content: { type: String, maxlength: [40000, 'content char limit is 10000'] },
    createDate: { type: Date, required: true, default: Date.now },
    userMessageId: { type: Number, required: [true, 'userMessageId is required'] }
});
const UserMessage = mongoose_1.default.models.UserMessage || mongoose_1.default.model('UserMessage', exports.UserMessageSchema);
exports.default = UserMessage;
