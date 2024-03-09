"use strict";
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: app for Space web server
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const user_1 = __importDefault(require("./routes/user"));
const connect_1 = __importDefault(require("./connect"));
const usermessages_1 = __importDefault(require("./routes/usermessages"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3333;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("welcome");
});
app.use("/api/users", users_1.default);
app.use("/api/user", user_1.default);
app.use("/api/user/messages", usermessages_1.default);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connect_1.default)(process.env.MONGO_URI);
            console.log("Connected to database.");
            app.listen(port, () => console.log(`Server listening on port: ${port}`));
        }
        catch (err) {
            console.log(err);
        }
    });
}
start();
