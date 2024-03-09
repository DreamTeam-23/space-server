
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: user route for Space web server
 */

import express from "express"
import { validateUser, decryptToken } from "../controller"

const user = express.Router()

user.route('/login').post(validateUser)
user.route('/validation').post(decryptToken)

export default user 