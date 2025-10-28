import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import swaggerJsdoc from "swagger-jsdoc";
dotenv.config();

const port = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chas-advance",
      description: "This is the API developed during our Chas-Advance project",
      version: "0.1.0",
    },
    servers: [
      {
        url: `http://localhost:${port}/`,
        description: "Local development server",
      },
      {
        url: `https://express-api7-f6auegdrc4b0fheg.swedencentral-01.azurewebsites.net`,
        description: "Production server (Azure)",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, "../src/routes/*.ts")],
};

const specs = swaggerJsdoc(options);

export default specs;
