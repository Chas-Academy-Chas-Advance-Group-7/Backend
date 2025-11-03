import express, { Router } from "express";
import db from "../../../db/db.js";

const sensorRoute = express.Router();

sensorRoute.get("/", (_req, res) => {
	res.status(200).json({ message: "Välkommen till sensor routen" });
});

sensorRoute.get("/get_readings/:id", async (req, res) => {
	const sensorId = Number(req.params.id);

	if (isNaN(sensorId)) {
		res.status(400).json({ mseesage: "Invalid sensor ID" });
		return;
	}

	try {
		const { rows: readings } = await db.pool.query(
			`SELECT * FROM "sensor_reading" WHERE sensor_id = $1`,
			[sensorId]
		);

		if (readings.length === 0) {
			res
				.status(404)
				.json({ message: `No readings found for sensor_id ${sensorId}` });
		}

		res.status(200).json({
			message: `Here are the readings for sensor_id ${sensorId}`,
			readings,
		});
	} catch (error) {
		console.error("Error getting the readings", error);
		res.status(500).json({ message: "Internal server error... " });
	}
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
	} catch (error) {
		console.error("Error inserting sensor readings:", error);
		res.status(500).json({ message: "Internal server error." });
	}
});

export default sensorRoute;
