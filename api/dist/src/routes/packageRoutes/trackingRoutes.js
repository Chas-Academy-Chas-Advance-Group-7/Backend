import express, { Router } from "express";
const trackingRoute = express.Router();
trackingRoute.get("/", (_req, res) => {
    res.status(200).json({ message: "Välkommen till tracking routen" });
});
//? - GET | Show order(all orders) in transit, AS USER ID/name(that the paket is connected to via sender order)
//? - GET | Show all orders in transit AS SENDER
//? - GET | Show live tracking snapshot for a package
//? - GET | Show real-time tracking stream (SSE/WebSocket)
export default trackingRoute;
//# sourceMappingURL=trackingRoutes.js.map