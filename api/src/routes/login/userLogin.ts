//* ROUTE FOR ALL LOGIN AND ACCOUNTS ACTIONS FOR USER

import express, { Router } from "express";

const userLogin: Router = express.Router();

userLogin.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till användar login",
	});
});

//? - GET | Get user profile / profile info

//? - PUT | Edit account info for user

//? - POST | Register user account
//? - POST | Login for user account

export default userLogin;
