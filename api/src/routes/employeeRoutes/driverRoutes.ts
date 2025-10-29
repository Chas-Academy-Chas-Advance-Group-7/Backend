import express, { Router } from "express";
import db from "../../../db/db.js";

const driverRoute = express.Router();

driverRoute.get("/", (_req, res) => {
  res.status(200).json({ message: "välkommen till driver routen" });
});

// DRIVER ROUTE
//? - PATCH | Register to a truck-brocker to begin transit

/**
 * @swagger
 * /employee_portal/driver_routes/register_to_truck/{driver_id}/{truck_id}:
 *   patch:
 *     summary: Assign or update a driver's truck
 *     description: Updates the `truck_id` for an existing driver by their ID. This is a partial update (PATCH) since only the truck assignment changes.
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: driver_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the driver to update.
 *         example: 5
 *       - in: path
 *         name: truck_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the truck to assign to the driver.
 *         example: 12
 *     responses:
 *       200:
 *         description: Driver's truck assignment updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Driver's truck assignment updated successfully
 *                 driver:
 *                   type: object
 *                   description: The updated driver record.
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 5
 *                     name:
 *                       type: string
 *                       example: Alex Johnson
 *                     truck_id:
 *                       type: integer
 *                       example: 12
 *       400:
 *         description: Invalid or missing driver or truck ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Driver ID is required and must be a valid number
 *       404:
 *         description: Driver not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Driver not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */
driverRoute.patch(
  "/register_to_truck/:driver_id/:truck_id",
  async (req, res) => {
    const { driver_id, truck_id } = req.params;

    const parsedDriverId = Number(driver_id);
    const parsedTruckId = Number(truck_id);

    if (!parsedDriverId || isNaN(parsedDriverId)) {
      res.status(400).json({
        error: "Driver Id is required and must be a number",
      });
      return;
    }

    if (!parsedTruckId || isNaN(parsedTruckId)) {
      res.status(400).json({
        error: "Truck Id is required and must be a number",
      });
      return;
    }

    try {
      const result = await db.pool.query(
        `UPDATE drivers
       SET truck_id = $1
       WHERE id = $2
       RETURNING *;`,
        [parsedTruckId, parsedDriverId]
      );

      if (result.rowCount === 0) {
        res.status(404).json({
          error: "Driver not found",
        });
        return;
      }

      res.status(200).json({
        message: "Driver successfully registered to truck",
        driver: result.rows[0],
      });
    } catch (error) {
      console.error("Error registering deriver to truck", error);
      res.status(500).json({
        error: "Internal server error",
      });
    }
  }
);

//ändra packetens status status får va varchar med(i lagret, in_transit, delivered)

//? - PATCH | Scan QR/barcode to load package onto truck
driverRoute.patch("/load_package/:package_id/:truck_id", async (req, res) => {
  const package_id = Number(req.params.package_id);
  const truck_id = Number(req.params.truck_id);
  if (!package_id || !truck_id) {
    res
      .status(400)
      .json({ message: "The package id or truck id could not be reqognized" });
    return;
  }
  try {
    const existing_package = await db.pool.query(
      `SELECT * FROM package WHERE id = $1`,
      [package_id]
    );
    const existing_truck = await db.pool.query(
      `SELECT * FROM trucks WHERE id = $1`,
      [truck_id]
    );
    if (existing_package.rowCount === 0 || existing_truck.rowCount === 0) {
      res.status(404).json({
        message:
          "the package or truck you are trying to register could not be found in the database",
      });
      return;
    }
    if (existing_package.rows[0].truck_id) {
      return res.status(400).json({
        message: "This package is already loaded onto another truck",
      });
    }
    const query = `UPDATE package SET truck_id = $1, status = $2 WHERE id = $3 RETURNING *`;
    const values = [truck_id, "loaded for delivery", package_id];

    const package_update = await db.pool.query(query, values);

    res.status(200).json({
      message: "Package succesfully loaded on the truck",
      result: package_update.rows[0],
    });
  } catch (error) {
    console.error("Error registering the package to the truck", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});
// param pack_id

// (dubbekolla så den finns kanske)

// lägga till truck_id på paket i databas

// EXTRA: Skapa truck tabell
//        Ändra package till att peka mot sensor id

//? - GET | Show all packages on a truck
//? - GET | Show all active alerts for packages on a truck

export default driverRoute;
