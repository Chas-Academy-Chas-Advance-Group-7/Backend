import express, { Router } from "express";

const employeePortal: Router = express.Router();

employeePortal.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till användar login",
	});
});

//*MIDDLEWARE FOR DRIVERS AND LOGISTICS
// DRIVER ROUTE
//? - POST | Register to a truck-brocker to begin transit
//? - POST | Register individuall order to the truck-brocker

//? - POST | Scan QR/barcode to load package onto truck
//? - GET | Show all packages on a truck
//? - GET | Show all active alerts for packages on a truck

// LOGISTICS ROUTE
//! HERE SHALL ALL LOGISTICS/WAREHOUSE CRUD BE PUT
//? - GET | Show overview dashboard (all packages linked to specific customer)
//? - GET | Show all trucks with current loads for this customer
//? - GET | Show packages filtered by customer, truck or time period
//? - GET | Show all broken cold chains (filter alerts for this customer)
//? - GET | Export reports as CSV or PDF
//? - GET | Show detailed history for specific package or trip

export default employeePortal;
