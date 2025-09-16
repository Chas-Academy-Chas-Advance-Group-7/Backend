import express, { Router } from "express";
import trackingRoute from "./trackingRoutes/trackingRoutes.ts";
import sensorRoute from "./sensor/sensorRoutes.ts";
const packagePortal = express.Router();

//route middleware

packagePortal.use("/tracking_packages", trackingRoute);
packagePortal.use("/sensor_packages", sensorRoute);
packagePortal.get("/", (_req, res) => {
	res.status(200).json({ message: "Välkommen till package portalen" });
});

export default packagePortal;
