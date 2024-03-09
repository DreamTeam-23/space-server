"use strict";
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: User model schema for Space web server
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    userId: { type: Number, required: [true, 'userId is required'] },
    email: { type: String, required: [true, 'email is required'], maxlength: [255, 'email char limit is 255'] },
    password: { type: String, required: [true, 'password is required'], maxlength: [80, 'password char limit is 80'] },
    username: { type: String, required: [true, 'username is required'], trim: true, maxlength: [80, 'username char limit is 80'] },
    createDate: { type: Date, required: true, default: Date.now }
});
const User = mongoose_1.default.models.User || mongoose_1.default.model('User', UserSchema);
exports.default = User;
