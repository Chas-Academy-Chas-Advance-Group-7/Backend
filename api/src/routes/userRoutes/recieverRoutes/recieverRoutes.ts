import express, { Router } from "express";

const recieverRoute = express.Router();

recieverRoute.get("/", (_req, res) => {
	res.status(200).json({ message: "Välkommen till reciever routen" });
});

// RECIEVER ROUTE
//? - GET | show a specific package that has been orderd by the user
//? - GET | Show all orders that are in transit
//? - GET | Show all orders by user (filter by status)

//? - PUT | altering delivery

//? - POST | Make an order / where the user sends their info to sender
//? - POST | Subscribe to alerts for a package

//? - DELETE | Unsubscribe from alerts for a package

export default recieverRoute;
