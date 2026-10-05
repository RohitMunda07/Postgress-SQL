import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

const config = {
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    port: Number(process.env.port),
    database: process.env.database,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.DB_CA,
    },
}
const pool = new Pool(config)

const connectDB = async () => {
    try {
        console.log("Connected to PostgreSQL");

        const result = await pool.query(
            `SELECT * FROM users`
        )

        if (!result) {
            console.log("Error Fetching Result from Database");
            process.exit(1);
        }

        console.log("Fetched Data:", result.rows);

    } catch (error) {
        console.log("Error Connecting the Database:", error)
    }

}

export default connectDB;