import jwt from "jsonwebtoken";
import type { jwtPayload } from "../types/types.js";

export function generateToken(payload: jwtPayload): string {
	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) throw new Error("JWT_SECRET not defined");

	return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}

export function verifyToken(token: string): jwtPayload {
	const jwtSecret = process.env.JWT_SECRET;
	if (!jwtSecret) throw new Error("JWT_SECRET not defined");

	const decoded = jwt.verify(token, jwtSecret) as unknown;

	if (
		typeof decoded !== "object" ||
		decoded === null ||
		!("sub" in decoded) ||
		!("role" in decoded) ||
		!("email" in decoded)
	) {
		throw new Error("Invalid token payload");
	}

	return decoded as jwtPayload;
}
