console.log("Server file loaded, starting Express... Hopefully!");

import express from "express";
import dotenv from "dotenv";
import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";
dotenv.config();

import db from "../db/db.js";
const { testConnection } = db;

import loginPortal from "./routes/login/loginPortal.js";
import userPortal from "./routes/userRoutes/userPortal.js";
import employeePortal from "./routes/employeeRoutes/employeePortal.js";
import packagePortal from "./routes/packageRoutes/packagePortal.js";

// Test DB connection
testConnection();

const app = express();

// Prefer Azure PORT over local SERVER_PORT
const port = parseInt(
	process.env.PORT ?? process.env.SERVER_PORT ?? "3000",
	10
);

// Middleware
app.use(express.json());

// Swagger setup
const swaggerDocs = YAML.load(path.resolve("./src/swagger/swagger.yaml"));
app.use(
	"/api-docs",
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocs, {
		explorer: true,
	})
);

// Routing Middleware
app.use("/login_portal", loginPortal);
app.use("/employee_portal", employeePortal);
app.use("/user_portal", userPortal);
app.use("/package_portal", packagePortal); // FIXED: add leading "/"

// Default root route
app.get("/", (_req, res) => {
	res
		.status(200)
		.json({ message: "Welcome to the internet, have a look around" });
});

// Start server
app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	console.log("ENV vars:", {
		SERVER_PORT: process.env.SERVER_PORT,
		PORT: process.env.PORT,
		NODE_ENV: process.env.NODE_ENV,
	});
});
