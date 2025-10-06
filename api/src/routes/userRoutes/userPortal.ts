import express, { Router } from "express";
import senderRoute from "./sendeRoutes/senderRoutes.js";
import recieverRoute from "./recieverRoutes/recieverRoutes.js";

const userPortal: Router = express.Router();

//*middleware for routes
userPortal.use("/reciever_route", recieverRoute);
userPortal.use("/sender_route", senderRoute);

userPortal.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till user portalen",
	});
});

export default userPortal;
