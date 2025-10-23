//!DONT FORGET TO AUTHENTICATE THE USERS
console.log("Server file loaded, starting Express... Hopefully!");
import express from "express";
import dotenv from "dotenv";
import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import db from "../db/db.js";
const { testConnection } = db;
import loginPortal from "./routes/login/loginPortal.js";
import userPortal from "./routes/userRoutes/userPortal.js";
import employeePortal from "./routes/employeeRoutes/employeePortal.js";
import packagePortal from "./routes/packageRoutes/packagePortal.js";
console.log("Server file loading...");
dotenv.config();
console.log("Environment loaded:", {
    PORT: process.env.PORT,
    SERVER_PORT: process.env.SERVER_PORT,
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET ? "Exists" : "Missing",
});
testConnection();
const app = express();
const port = parseInt(process.env.PORT || "3000", 10);
//middleware
app.use(express.json());
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Chas-advance",
            description: "this is the api developed during our chas-advance project",
            version: "0.1.0",
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: "This is a local dev server for documentation",
            },
        ],
    },
    apis: ["./routes/*.ts"],
};
const swaggerDocs = YAML.load(path.resolve("./src/swagger/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//*Routing Middleware
// Router for all login CRUD-operations
app.use("/login_portal", loginPortal);
// Route for all driver CRUD-operations
app.use("/employee_portal", employeePortal);
// Route for all user CRUD-operations
app.use("/user_portal", userPortal);
// Route for all tracking/sensor CRUD-operations
app.use("/package_portal", packagePortal);
app.get("/", (_req, res) => {
    res
        .status(200)
        .json({ message: "Welcome to the internet, have a look around" });
});
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is listening on port ${port}`);
    console.log("ENV vars:", {
        SERVER_PORT: process.env.SERVER_PORT,
        PORT: process.env.PORT,
        NODE_ENV: process.env.NODE_ENV,
    });
});
//# sourceMappingURL=server.js.map