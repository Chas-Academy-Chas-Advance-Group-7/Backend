import express from "express";
import dotenv from "dotenv";
dotenv.config();

import loginPortal from "./routes/login/loginPortal.ts";
import userPortal from "./routes/userRoutes/userPortal.ts";
import driverPortal from "./routes/driverRoutes/driverPortal.ts";
// const express = require("express");
const app = express();
const port = process.env.PORT;

//middleware
app.use(express.json());

//*Routing middleware
// Router for all login CRUD-operations
app.use("/login_portal", loginPortal);
// Route for all driver CRUD-operations
app.use("/driver_portal", driverPortal);
// Route for all user CRUD-operations
app.use("/user_portal", userPortal);

app.get("/", (_req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
