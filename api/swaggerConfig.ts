import YAML from "yamljs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const swaggerJsdoc = require("swagger-jsdoc");

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
	apis: [path.resolve(__dirname, "./routes/*.ts")],
};
const swaggerDocs = YAML.load(path.resolve("./src/swagger/swagger.yaml"));

const specs = swaggerJsdoc("swaggerOptions");
module.exports = specs;
