
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: controller for Space web server
 */

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User";
import UserMessage from "./models/UserMessage";
import Reminder from "./models/Reminder";

const saltRounds = 6;

export interface IDecodedUser {
    userId: number
};

export async function validateUser(req: Request, res: Response) {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (!user) return res.json({ result: { user: null, token: null } });
    bcrypt.compare(password, user?.password || "", function (err, result) {
        if (result === true) {
            const token = jwt.sign({ id: user?.id }, "secret", { expiresIn: "2days" });
            res.json({ result: { user, token } });
        }
        else {
            return res.json({ result: { user: null, token: null } });
        }
    })
}

export async function decryptToken(req: Request, res: Response) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(403).send("Header does not exist");
            return "";
        }
        const token = authHeader.split(" ")[1];
        const decodedUser = jwt.verify(token, "secret");
        const user = searchUserById((decodedUser as IDecodedUser).userId);
        res.json({ result: { user, token } });
    }
    catch (err) {
        res.status(401).json({ err });
    }
}

export async function searchUserById(id: number) {
    const user = User.findOne({ userId: id });
    // if (!user) throw new Error("User not found");
    return user;
}

export async function getUser(req: Request, res: Response) {
    const userId = req.params.userId;
    try {
        const user = await User.find({ userId: parseInt(userId) })
        res.json({ user });
    }
    catch (err) {
        console.log(err)
    }
}

export async function createUser(req: Request, res: Response) {
    const users = await User.find({})
    const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const badges = 0;
    if (users.find((user: any) => user.username === username.toString())) {
        res.json({ success: false, message: "Username already exists" })
    }
    else {
        console.log(users.find((user: any) => user.username === username.toString()))
        const encrypted = await bcrypt.hash(password, saltRounds)
        const user = await User.create({ username, password: encrypted, email, userId, badges })
        res.status(200).json({ success: true, message: "Sign up successful!" })
    }
}

export async function createUserMessage(req: Request, res: Response) {
    const userMessages = await UserMessage.find({});
    const userMessageId = userMessages.length === 0 ? 1 : userMessages[userMessages.length - 1].userMessageId + 1;
    const email = req.body.email;
    const content = req.body.content;
    try {
        await UserMessage.create({ email, content, userMessageId });
        res.status(200).json({ success: true, message: "Message sent successfully!" })
    }
    catch (err) {
        console.log(err)
    }
}

export async function createReminder(req: Request, res: Response) {
    const reminders = await Reminder.find({})
    const reminderId = reminders.length === 0 ? 1 : reminders[reminders.length - 1].reminderId + 1
    const category = req.body.category
    const title = req.body.title
    const userId = req.body.userId
    try {
        await Reminder.create({ category, title, userId, reminderId })
        res.status(200).json({ success: true, message: "Reminder created successfully!" })
    }
    catch (err) {
        console.log(err)
    }
}

export async function getReminders(req: Request, res: Response) {
    const userId = req.params.userId
    try {
        const reminders = await Reminder.find({ userId })
        res.json(reminders)
    }
    catch (err) {
        console.log(err)
    }
}

export async function completeReminder(req: Request, res: Response) {
    const reminderId = req.params.reminderId
    const completed = true
    try {
        await Reminder.findOneAndUpdate({ reminderId }, { completed })
        res.status(200).json({ success: true, message: "Reminder completed successfully!" })
    }
    catch (err) {
        console.log(err)
    }
}