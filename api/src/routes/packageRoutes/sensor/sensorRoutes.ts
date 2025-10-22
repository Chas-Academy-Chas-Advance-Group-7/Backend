import express, { Router } from "express";
import db from "../../../../db/db.js";

const pool = db.pool;

const sensorRoute = express.Router();

sensorRoute.get("/", (_req, res) => {
	res.status(200).json({ message: "Välkommen till sensor routen" });
});

sensorRoute.post("/in_transit", async (req, res) => {
	const { accesKey, truck_id, sensors } = req.body;

	if (!accesKey || !truck_id || sensors.isArray()) {
		res.status(400).json({
			message: "Acces key or truck_id is missing ",
		});
		return;
	}

	if (accesKey !== process.env.SENSOR_ACCES_KEY) {
		res.status(401).json({
			message:
				"The acces key that was submitted is false, no allowance admitted",
		});
		return;
	}

	try {
		const query = `INSERT INTO sensor_reading (sensor_id, timestamp, temperature, humidity) VALUES ($1, $2, $3, $4)`;
		sensors.forEach((sensor: any) => {
			const values = [
				sensor.sensor_id,
				sensor.data.temperature,
				sensor.data.humidity,
				sensor.data.timestamp,
			];
			const insertReading = await db.pool.query(query, values);
		});

		const;
	} catch (error) {}
});

export default sensorRoute;
