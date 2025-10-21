//* ROUTE FOR ALL LOGIN AND ACCOUNTS ACTIONS FOR USER
import bcrypt from "bcrypt";
import express, { Router } from "express";

import db from "../../../db/db.js";
import { generateToken } from "../../middlewere/generate_jwt.js";
import type { jwtPayload } from "../../types/types.js";

const userLogin: Router = express.Router();

userLogin.get("/", (_req, res) => {
	res.status(200).json({
		message: "Välkommen till user login routen",
	});
});

//? - GET | Get user profile / profile info

//? - PUT | Edit account info for user

//? - POST | Register user account
userLogin.post("/register", async (req, res) => {
	const { email, password, user_name } = req.body;

	const emailLowerCase = email.trim().toLowerCase();
	const isRedundantEmail = await db.pool.query(
		"SELECT * FROM users WHERE email = $1",
		[emailLowerCase]
	);

	if (
		!user_name ||
		typeof user_name !== "string" ||
		user_name.trim().length === 0
	) {
		res.status(400).json({
			error:
				"Username is required and must only consist of alfabetical characters",
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

		const insertUser = await db.pool.query(
			"INSERT INTO users (email, password, user_name) VALUES ($1, $2, $3) RETURNING *",
			[emailLowerCase, hashedPassword, user_name]
		);

		const newUser = insertUser.rows[0];

		const payload: jwtPayload = {
			sub: newUser.id,
			role: "user",
			email: newUser.email,
		};

		const token = generateToken(payload);
		res.status(201).json({
			message: "User registered successfully",
			token,
		});
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({
			error: " No Irie me bredren, Internal server error",
		});
	}
});

//? - POST | Login for user account
userLogin.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const lowerCaseEmail = email.toLowerCase();

	if (![lowerCaseEmail, password].every(Boolean)) {
		res.status(400).json({
			message: "All fields are required.",
		});
		return;
	}

	try {
		const userAccount = await db.pool.query(
			"SELECT * FROM users WHERE email = $1",
			[lowerCaseEmail]
		);

		const user = userAccount.rows[0];

		if (!user) {
			res.status(401).json({
				message: "Invalid credentials",
			});
			return;
		}

		const passwordValid_check = await bcrypt.compare(password, user.password);

		if (!passwordValid_check) {
			res.status(401).json({
				message: "Invalid credentials",
			});
			return;
		}

		const payload: jwtPayload = {
			sub: user.id,
			role: "user",
			email: user.email,
		};

		const token = generateToken(payload);

		res.status(200).json({
			message: "Login successful",
			token,
		});
	} catch (error) {
		console.error("Login DB error:", error);
		res.status(500).json({
			message: "Internal serever error",
		});
	}
});

export default userLogin;
