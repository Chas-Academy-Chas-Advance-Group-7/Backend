import { writeFileSync, existsSync, mkdirSync } from "fs";
import path from "path";
import specs from "./swaggerConfig.js";
// Go up two levels from dist/ to get project root
const docsDir = path.resolve(__dirname, "../docs");
if (!existsSync(docsDir)) {
    mkdirSync(docsDir, { recursive: true });
}
writeFileSync(path.join(docsDir, "openapi.json"), JSON.stringify(specs, null, 2));
console.log("OpenAPI documentation successfully generated to docs/openapi.json");
//# sourceMappingURL=generate-docs.js.map