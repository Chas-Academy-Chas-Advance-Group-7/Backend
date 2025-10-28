import express, { Router } from "express";
import db from "../../../../db/db.js";
const pool = db.pool;
const sensorRoute = express.Router();
sensorRoute.get("/", (_req, res) => {
    res.status(200).json({ message: "Välkommen till sensor routen" });
});
sensorRoute.post("/in_transit_sensor_readings", async (req, res) => {
    const { accessKey, truck_id, sensors } = req.body;
    // Validation
    if (!accessKey || !truck_id) {
        return res.status(400).json({
            message: "Access key or truck_id is missing",
        });
    }
    // Check access key
    if (accessKey != process.env.SENSOR_ACCESS_KEY) {
        return res.status(401).json({
            message: "The access key that was submitted is invalid",
        });
    }
    try {
        const query = `
      INSERT INTO sensor_reading (sensor_id, temperature, humidity, reading_timestamp,  stale )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const results = [];
        for (const sensor of sensors) {
            const timestamp = new Date();
            const values = [
                sensor.sensor_id,
                sensor.data.temperature,
                sensor.data.humidity,
                timestamp,
                sensor.stale ?? false,
            ];
            const insertReading = await db.pool.query(query, values);
            results.push(insertReading.rows[0]);
        }
        res.status(201).json({
            message: "Sensor readings inserted successfully.",
            data: results,
            truck_id: truck_id,
        });
    }
    catch (error) {
        console.error("Error inserting sensor readings:", error);
        res.status(500).json({ message: "Internal server error." });
    }
});
export default sensorRoute;
//# sourceMappingURL=sensorRoutes.js.map