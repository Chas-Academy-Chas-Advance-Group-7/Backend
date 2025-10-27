import fs from "fs";
import path from "path";
import specs from "./swaggerConfig.js";

const docsDir = path.join(__dirname, "docs");

if (!fs.existsSync(docsDir)) {
	fs.mkdirSync(docsDir);
}

fs.writeFileSync(
	path.join(docsDir, "openapi.json"),
	JSON.stringify(specs, null, 2)
);

console.log(
	"OpenAPI documentation successfully generated to docs/openapi.json"
);
