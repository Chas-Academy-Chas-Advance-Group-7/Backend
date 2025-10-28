import express, { Router } from "express";
import { authenticateJWT } from "../../../middlewere/auth.js";
import db from "../../../../db/db.js";
const recieverRoute = express.Router();

recieverRoute.get("/", (_req, res) => {
  res.status(200).json({ message: "Välkommen till reciever routen" });
});

// RECIEVER ROUTE
//! - GET | Show all orders by user (filter by status)
/**
 * @swagger
 * /all_packages/{id}:
 *   get:
 *     summary: Get all packages for a specific user
 *     description: Retrieves all packages where the receiver ID matches the provided user ID.
 *     tags:
 *       - Packages
 *     security:
 *       - bearerAuth: []   # Requires JWT authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the user (receiver)
 *     responses:
 *       200:
 *         description: Successfully retrieved all packages for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   package_id:
 *                     type: integer
 *                     example: 101
 *                   receiver_id:
 *                     type: integer
 *                     example: 42
 *                   sender_id:
 *                     type: integer
 *                     example: 17
 *                   status:
 *                     type: string
 *                     example: "In Transit"
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *       401:
 *         description: Unauthorized or missing user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user id could not be found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
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
