//* ROUTE FOR ALL LOGIN AND ACCOUNTS ACTIONS FOR USERS AND DRIVERSzz
import express, { Router } from "express";
import userLogin from "./userLogin.js";
import driverLogin from "./driverLogin.js";
const loginPortal = express.Router();
//* MIDDLEWARE FOR ROUTES
// LOGISTICS/WAREHOUSE ROUTE
//? - POST | Create Logistics/Warehouse account
//? - POST | Login Logistics/Warehouse account
loginPortal.use("/user_login", userLogin);
loginPortal.use("/driver_login", driverLogin);
loginPortal.get("/", (_req, res) => {
    res.status(200).json({ message: "Välkommen till login portalen" });
});
export default loginPortal;
//# sourceMappingURL=loginPortal.js.map