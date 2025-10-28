import express, { Router } from "express";
import warehouseRoute from "./warehouseRoutes.js";
import driverRoute from "./driverRoutes.js";

const employeePortal: Router = express.Router();

//*MIDDLEWARE FOR DRIVERS AND LOGISTICS
employeePortal.use("/warehouse_routes", warehouseRoute);
employeePortal.use("/driver_routes", driverRoute);

employeePortal.get("/", (_req, res) => {
  res.status(200).json({
    message: "Välkommen till employee portalen",
  });
});

export default employeePortal;
