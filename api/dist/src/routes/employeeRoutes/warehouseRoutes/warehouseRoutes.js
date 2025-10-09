import express, { Router } from "express";
const warehouseRoute = express.Router();
warehouseRoute.get("/", (_req, res) => {
    res.status(200).json({ message: "välkommen till warehouse routen" });
});
// LOGISTICS ROUTE
//! HERE SHALL ALL LOGISTICS/WAREHOUSE CRUD BE PUT
//? - GET | Show overview dashboard (all packages linked to specific customer)
//? - GET | Show all trucks with current loads for this customer
//? - GET | Show packages filtered by customer, truck or time period
//? - GET | Show all broken cold chains (filter alerts for this customer)
//? - GET | Export reports as CSV or PDF
//? - GET | Show detailed history for specific package or trip
export default warehouseRoute;
//# sourceMappingURL=warehouseRoutes.js.map