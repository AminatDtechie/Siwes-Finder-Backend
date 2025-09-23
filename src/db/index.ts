import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const db = drizzle(pool, { logger: true });

// ✅ function to test DB connection
export async function testDbConnection() {
  try {
    const client = await pool.connect();
    await client.query("SELECT NOW()"); // simple test query
    client.release();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
    process.exit(1); // exit app if db is critical
  }
}
testDbConnection();
export { db };
