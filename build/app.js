"use strict";
const express = require("express");
const dotenv = require("dotenv");
const db = require("./schema/db");
// Init config
dotenv.config();
/* Init application */
const app = express();
/* Home route */
app.get("/", (req, res) => {
    res.send("Connected");
});
/* Listen on port 8888 */
app.listen(process.env.PORT, () => {
    console.log("server is running");
});
