import express, { Request, Response, Router } from "express";

const userLogin: Router = express.Router();

userLogin.get("/", (_req, res) => {
  res.status(200).json({
    message: "Välkommen till användar login",
  });
});

//POST | Register user account

//POST | Login for user account

export default userLogin;
