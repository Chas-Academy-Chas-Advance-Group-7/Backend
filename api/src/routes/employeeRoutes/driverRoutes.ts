import express, { Router } from "express";

const driverRoute = express.Router();

driverRoute.get("/", (_req, res) => {
  res.status(200).json({ message: "välkommen till driver routen" });
});

// DRIVER ROUTE
//? - POST | Register to a truck-brocker to begin transit
//? - POST | Register individuall order to the truck-brocker

//? - POST | Scan QR/barcode to load package onto truck
//? - GET | Show all packages on a truck
//? - GET | Show all active alerts for packages on a truck

export default driverRoute;
