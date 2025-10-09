import express, { Router } from "express";
const sensorRoute = express.Router();
sensorRoute.get("/", (_req, res) => {
    res.status(200).json({ message: "Välkommen till sensor routen" });
});
export default sensorRoute;
//# sourceMappingURL=sensorRoutes.js.map