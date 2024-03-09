
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: users route for Space web server
 */

import express from "express"
import { createUser, getUser } from "../controller"

const users = express.Router()

users.route('/').post(createUser)
users.route('/:userId').get(getUser).post()

export default users 