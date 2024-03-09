
/*
author: Paul Kim
date: March 9, 2024
version: 1.0
description: connectDB for Space web server
 */

import mongoose from "mongoose";

export default function connectDB(url: any) {
    return mongoose.connect(url);
}
