import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL?.trim();

// detect azure host simply (used only to enable TLS)
const isAzureHost =
	(connectionString &&
		connectionString.includes("postgres.database.azure.com")) ||
	(process.env.PGHOST &&
		process.env.PGHOST.includes("postgres.database.azure.com"));

const pool = connectionString
	? new Pool({
			connectionString,
			// Azure requires TLS; this config encrypts the connection but does not validate the cert chain
			...(isAzureHost ? { ssl: { rejectUnauthorized: false } } : {}),
	  })
	: new Pool({
			user: process.env.PGUSER,
			password: process.env.PGPASSWORD,
			database: process.env.PGDATABASE,
			host: process.env.PGHOST,
			port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
			...(isAzureHost ? { ssl: { rejectUnauthorized: false } } : {}),
	  });

pool.on("error", (err: Error) => {
	console.error("Unexpected idle PostgreSQL client error", err);
});

/**
 * Lightweight connection test that works before schema exists.
 */
const testConnection = async () => {
	try {
		const res = await pool.query("SELECT 1 as ok");
		console.log("DB connection test OK:", res.rows);
		console.log("Connecting to DB with:", {
			host: process.env.PGHOST ?? "via DATABASE_URL",
			database: process.env.PGDATABASE ?? "via DATABASE_URL",
			user: process.env.PGUSER ?? "via DATABASE_URL",
			ssl: isAzureHost,
		});
		return true;
	} catch (error) {
		if (error instanceof Error) {
			console.error("Connection error:", error.message);
		} else {
			console.error("Unknown error:", error);
		}
		return false;
	}
};

export default { pool, testConnection };
