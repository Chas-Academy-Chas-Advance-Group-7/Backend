import { writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import specs from "./swaggerConfig.js";
// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Create docs directory if it doesn't exist
const docsDir = path.join(__dirname, "docs");
if (!existsSync(docsDir)) {
    mkdirSync(docsDir);
}
// Write JSON file
writeFileSync(path.join(docsDir, "openapi.json"), JSON.stringify(specs, null, 2));
console.log("OpenAPI documentation successfully generated to docs/openapi.json");
//# sourceMappingURL=generate-docs.js.map