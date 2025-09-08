import express, { Router } from "express";
import userLogin from "./userLogin.ts";
import driverLogin from "./driverLogin.ts";
const loginPortal = express.Router();
// This route facilitates all the login and register CRUD-operations for all
//* users and drivers

loginPortal.use("/user_login", userLogin);
loginPortal.use("/driver_login", driverLogin);

loginPortal.get("/", (_req, res) => {
	res.status(200).json({ message: "Välkommen till login portalen" });
});

export default loginPortal;
