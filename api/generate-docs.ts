import { writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import specs from "./swaggerConfig.js";

//  Fix for __dirname in ESM (required because "type": "module" in package.json)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//  Go up one level from dist/ to project root
const docsDir = path.resolve(__dirname, "../docs");

if (!existsSync(docsDir)) {
	mkdirSync(docsDir, { recursive: true });
}

//  Write JSON file to project root/docs
writeFileSync(
	path.join(docsDir, "openapi.json"),
	JSON.stringify(specs, null, 2)
);

console.log(
	"OpenAPI documentation successfully generated to:",
	path.join(docsDir, "openapi.json")
);
