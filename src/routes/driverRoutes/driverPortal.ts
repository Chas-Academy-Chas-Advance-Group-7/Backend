import express, { Router } from "express";

const driverPortal: Router = express.Router();

driverPortal.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till användar login",
	});
});

//POST | Register user account

//POST | Login for user account

export default driverPortal;
