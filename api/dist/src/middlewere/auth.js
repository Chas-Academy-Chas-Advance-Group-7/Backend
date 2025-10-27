import { verifyToken } from "../middlewere/generate_jwt.js";
export function authenticateJWT(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Invalid authentication header " });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded; // attach user to req (you may need to extend Express types)
        next();
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
}
//# sourceMappingURL=auth.js.map