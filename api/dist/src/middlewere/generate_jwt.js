import jwt from "jsonwebtoken";
export function generateToken(payload) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET missing in generateToken()");
        throw new Error("JWT_SECRET not defined");
    }
    return jwt.sign(payload, jwtSecret, { expiresIn: "1h" });
}
export function verifyToken(token) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("JWT_SECRET missing in generateToken()");
        throw new Error("JWT_SECRET not defined");
    }
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded !== "object" ||
        decoded === null ||
        !("sub" in decoded) ||
        !("role" in decoded) ||
        !("email" in decoded)) {
        throw new Error("Invalid token payload");
    }
    return decoded;
}
//# sourceMappingURL=generate_jwt.js.map