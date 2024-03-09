"use strict";
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: controller for Space web server
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserMessage = exports.createUser = exports.getUser = exports.searchUserById = exports.decryptToken = exports.validateUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("./models/User"));
const UserMessage_1 = __importDefault(require("./models/UserMessage"));
const saltRounds = 6;
;
function validateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        const user = yield User_1.default.findOne({ username: username });
        if (!user)
            return res.json({ result: { user: null, token: null } });
        bcrypt_1.default.compare(password, (user === null || user === void 0 ? void 0 : user.password) || "", function (err, result) {
            if (result === true) {
                const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user.id }, "secret", { expiresIn: "2days" });
                res.json({ result: { user, token } });
            }
            else {
                return res.json({ result: { user: null, token: null } });
            }
        });
    });
}
exports.validateUser = validateUser;
function decryptToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(403).send("Header does not exist");
                return "";
            }
            const token = authHeader.split(" ")[1];
            const decodedUser = jsonwebtoken_1.default.verify(token, "secret");
            const user = searchUserById(decodedUser.userId);
            res.json({ result: { user, token } });
        }
        catch (err) {
            res.status(401).json({ err });
        }
    });
}
exports.decryptToken = decryptToken;
function searchUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = User_1.default.findOne({ userId: id });
        // if (!user) throw new Error("User not found");
        return user;
    });
}
exports.searchUserById = searchUserById;
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.params.userId;
        try {
            const user = yield User_1.default.find({ userId: parseInt(userId) });
            res.json({ user });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield User_1.default.find({});
        const userId = users.length === 0 ? 1 : users[users.length - 1].userId + 1;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        if (users.find((user) => user.username === username.toString())) {
            res.json({ success: false, message: "Username already exists" });
        }
        else {
            console.log(users.find((user) => user.username === username.toString()));
            const encrypted = yield bcrypt_1.default.hash(password, saltRounds);
            const user = yield User_1.default.create({ username, password: encrypted, email, userId });
            res.status(200).json({ success: true, message: "Sign up successful!" });
        }
    });
}
exports.createUser = createUser;
function createUserMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userMessages = yield UserMessage_1.default.find({});
        const userMessageId = userMessages.length === 0 ? 1 : userMessages[userMessages.length - 1].userMessageId + 1;
        const email = req.body.email;
        const content = req.body.content;
        try {
            yield UserMessage_1.default.create({ email, content, userMessageId });
            res.status(200).json({ success: true, message: "Message sent successfully!" });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.createUserMessage = createUserMessage;
