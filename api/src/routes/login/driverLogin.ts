//* ROUTE FOR ALL LOGIN AND ACCOUNTS ACTIONS FOR DRIVER
import express, { Router } from "express";

const driverLogin: Router = express.Router();

driverLogin.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till användar login",
	});
});

//? - GET | Get driver profile / profile info

//? - PUT | Edit account info for driver

//? - POST | Register driver account
//? - POST | Login for driver account

export default driverLogin;
