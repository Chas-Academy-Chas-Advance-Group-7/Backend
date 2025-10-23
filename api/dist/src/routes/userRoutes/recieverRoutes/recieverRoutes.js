import express, { Router } from "express";
import { authenticateJWT } from "../../../middlewere/auth.js";
import db from "../../../../db/db.js";
const recieverRoute = express.Router();
recieverRoute.get("/", (_req, res) => {
    res.status(200).json({ message: "Välkommen till reciever routen" });
});
// RECIEVER ROUTE
//? - GET | show a specific package that has been orderd by the user
recieverRoute.get("/single_package/:id", authenticateJWT, async (req, res) => {
    const user_id = Number(req.params.id);
    if (!user_id) {
        return res.status(401).json({ message: "user id could not be found" });
    }
    try {
        const query = `SELECT * FROM package WHERE receiver_id = $1 RETURNING *`;
        const values = [user_id];
        const jsonData = await db.pool.query(query, values);
        res.status(200).json(jsonData.rows);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});
//? - GET | Show all orders that are in transit
//? - GET | Show all orders by user (filter by status)
//? - PUT | altering delivery
//? - POST | Make an order / where the user sends their info to sender
//? - POST | Subscribe to alerts for a package
//? - DELETE | Unsubscribe from alerts for a package
export default recieverRoute;
//# sourceMappingURL=recieverRoutes.js.map