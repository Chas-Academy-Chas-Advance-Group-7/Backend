import express, { Request, Response, Router } from "express";

const userPortal: Router = express.Router();

userPortal.get("/", (_req, res) => {
  res.status(200).json({
    message: "Välkommen till användar login",
  });
});

//POST | Register user account

//POST | Login for user account

export default userPortal;
