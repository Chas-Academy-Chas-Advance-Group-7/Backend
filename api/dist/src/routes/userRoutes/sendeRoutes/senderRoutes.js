import express, { Router } from "express";
import db from "../../../../db/db.js";
import { authenticateJWT } from "../../../middlewere/auth.js";
const senderRoute = express.Router();
senderRoute.get("/", (_req, res) => {
    res.status(200).json({ message: "Välkommen till sender routen" });
});
// SENDER ROUTE
//? - GET | show all orders
senderRoute.get("/all_packages/:id", authenticateJWT, async (req, res) => {
    const user_id = Number(req.params.id);
    if (!user_id) {
        return res.status(401).json({ message: "user id could not be found" });
    }
    try {
        const query = `SELECT * FROM package WHERE sender_id = $1`;
        const values = [user_id];
        const jsonData = await db.pool.query(query, values);
        res.status(200).json(jsonData.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
//? - GET | Show all orders in transit (with sensor data maybe)
//? - GET | Show sensor history for a package
//? - PUT | Update package info (recipient, thresholds, notes)
//? - PATCH | Cancel an order before pickup
//? - POST | make a paket and post it to the warehouse
//? - POST | Generate QR/Barcode label for a package
//? - POST | Set/update thresholds for a package
//? - DELETE | delete an order when the order is fulfilled/sent
export default senderRoute;
//# sourceMappingURL=senderRoutes.js.map