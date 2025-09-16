import express, { Router } from "express";

const senderRoute = express.Router();

senderRoute.get("/", (_req, res) => {
	res.status(200).json({ message: "Välkommen till sender routen" });
});

// SENDER ROUTE
//? - GET | show all orders
//? - GET | Show all orders in transit (with sensor data maybe)
//? - GET | Show sensor history for a package

//? - PUT | Update package info (recipient, thresholds, notes)
//? - PATCH | Cancel an order before pickup

//? - POST | make a paket and post it to the warehouse
//? - POST | Generate QR/Barcode label for a package
//? - POST | Set/update thresholds for a package

//? - DELETE | delete an order when the order is fulfilled/sent

export default senderRoute;
