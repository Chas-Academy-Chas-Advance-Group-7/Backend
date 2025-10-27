import express, { Router } from "express";
import { authenticateJWT } from "../../../middlewere/auth.js";
import db from "../../../../db/db.js";
const recieverRoute = express.Router();

recieverRoute.get("/", (_req, res) => {
  res.status(200).json({ message: "Välkommen till reciever routen" });
});

// RECIEVER ROUTE
//! - GET | Show all orders by user (filter by status)

recieverRoute.get("/all_packages/:id", authenticateJWT, async (req, res) => {
  const user_id = Number(req.params.id);
  if (!user_id) {
    return res.status(401).json({ message: "user id could not be found" });
  }

  try {
    const query = `SELECT * FROM package WHERE receiver_id = $1`;
    const values = [user_id];
    const jsonData = await db.pool.query(query, values);

    res.status(200).json(jsonData.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
//! - GET | show a specific package that has been orderd by the user

recieverRoute.get(
  "/single_package/:user_id/:package_id",
  authenticateJWT,
  async (req, res) => {
    const user_id = req.params.user_id;
    const package_id = req.params.package_id;

    if (!user_id || !package_id) {
      return res
        .status(401)
        .json({ message: "user id or package id could not be found" });
    }

    try {
      const query = `
                SELECT 
                    p.*, 
                    receiver.email AS receiver_email, 
                    receiver.user_name AS receiver_name, 
                    sender.email AS sender_email, 
                    sender.user_name AS sender_name, 
                    delivery_point.address AS delivery_address, 
                    delivery_point.postal_code AS delivery_postal_code, 
                    delivery_point.city AS delivery_city
                FROM 
                    package p
                JOIN 
                    users receiver ON p.receiver_id = receiver.id
                JOIN 
                    users sender ON p.sender_id = sender.id
                JOIN 
                    delivery_point ON p.delivery_point_id = delivery_point.id
                WHERE 
                    p.receiver_id = $1 
                    AND p.id = $2;
            `;
      const values = [user_id, package_id];
      const jsonData = await db.pool.query(query, values);

      res.status(200).json(jsonData.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//? - GET | Show all orders that are in transit

//? - PUT | altering delivery

//? - POST | Make an order / where the user sends their info to sender
//? - POST | Subscribe to alerts for a package

//? - DELETE | Unsubscribe from alerts for a package

export default recieverRoute;
