import express, { Router } from "express";

const driverLogin: Router = express.Router();

driverLogin.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till användar login",
	});
});

//POST | Register driver account

//POST | Login for driver account

export default driverLogin;
