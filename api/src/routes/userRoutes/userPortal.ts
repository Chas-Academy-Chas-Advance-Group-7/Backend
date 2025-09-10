import express, { Router } from "express";

const userPortal: Router = express.Router();

userPortal.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till användar login",
	});
});
//*middleware for routes

// RECIEVER ROUTE
//? - GET | show a specific package that has been orderd by the user
//? - GET | Show all orders that are in transit
//? - GET | Show all orders by user (filter by status)

//? - PUT | altering delivery

//? - POST | Make an order / where the user sends their info to sender
//? - POST | Subscribe to alerts for a package

//? - DELETE | Unsubscribe from alerts for a package
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

export default userPortal;
