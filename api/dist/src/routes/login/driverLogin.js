//* ROUTE FOR ALL LOGIN AND ACCOUNTS ACTIONS FOR DRIVER
import bcrypt from "bcrypt";
import express, { Router } from "express";
import db from "../../../db/db.js";
import { generateToken } from "../../middlewere/generate_jwt.js";
const driverLogin = express.Router();
driverLogin.get("/", (_req, res) => {
    res.status(200).json({
        message: "Välkommen till driver login routen",
    });
});
//? - GET | Get driver profile / profile info
//? - PUT | Edit account info for driver
//? - POST | Register driver account
driverLogin.post("/register", async (req, res) => {
    const { email, password, username } = req.body;
    const emailLowerCase = email.trim().toLowerCase();
    const isRedundantEmail = await db.pool.query("SELECT * FROM drivers WHERE email = $1", [emailLowerCase]);
    if (!username ||
        typeof username !== "string" ||
        username.trim().length === 0) {
        res.status(400).json({
            error: "Username is requered and must only consist of alfabetical characters",
        });
        return;
    }
    if (!password || typeof password !== "string" || password.length < 6) {
        res.status(400).json({
            error: "Password is required and must be at least 6 characters long.",
        });
        return;
    }
    try {
        if ((isRedundantEmail.rowCount ?? 0) > 0) {
            res.status(400).json({ error: "Email already registered" });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertDriver = await db.pool.query("INSERT INTO drivers (username, email, password) VALUES ($1, $2, $3) RETURNING", [username, emailLowerCase, hashedPassword]);
        const newDriver = insertDriver.rows[0];
        const payload = {
            sub: newDriver.id,
            role: "driver",
            email: newDriver.email,
        };
        const token = generateToken(payload);
        res.status(201).json({
            message: "Driver registered successfully",
            token,
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});
//? - POST | Login for driver account
driverLogin.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const lowerCaseEmail = email.toLowerCase();
    if (![lowerCaseEmail, password].every(Boolean)) {
        res.status(400).json({
            message: "All fields are requred.",
        });
        return;
    }
    try {
        const driverResult = await db.pool.query("SELECT * FROM drivers WHERE email = $1", [lowerCaseEmail]);
        const driver = driverResult.rows[0];
        if (!driver) {
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }
        const passwordValid_check = await bcrypt.compare(password, driver.password);
        if (!passwordValid_check) {
            res.status(401).json({
                message: "Invalid credentials",
            });
            return;
        }
        const payload = {
            sub: driver.id,
            role: "driver",
            email: driver.email,
        };
        const token = generateToken(payload);
        res.status(200).json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        console.error("Login DB error:", error);
        res.status(500).json({
            message: "Internal serever error",
        });
    }
});
export default driverLogin;
//# sourceMappingURL=driverLogin.js.map