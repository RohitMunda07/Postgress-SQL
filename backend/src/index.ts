import fs from "node:fs";
import { Client } from "pg";
import url from "url"
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
};

const client = new Client(config);
// client.connect(function (err: any) {
//     if (err)
//         throw err;
//     client.query("SELECT VERSION()", [], function (err, result) {
//         if (err)
//             throw err;

//         console.log(result.rows[0].version);
//         client.end(function (err) {
//             if (err)
//                 throw err;
//         });
//     });
// });

const main = async () => {
    try {
        await client.connect()

        console.log("Connected to PostgreSQL");

        await client.query(
            `CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL ,
                password VARCHAR(255) NOT NULL
            )`
        )

        console.log("Users table created successfully")

        const insertResult = await client.query(`
                INSERT INTO users (name, email, password)
                VALUES ('Rahul', 'rahul@gmail.com', 'rahul@123')
                RETURNING *;
        `);
        
        console.log("Inserted user all rows:", insertResult.rows);
        console.log("Inserted user:", insertResult.rows[0]);

        // const result = await client.query("SELECT * FROM users");

        // console.log("Users:", result.rows);

    } catch (error) {
        console.error("Database error:", error);
    } finally {
        await client.end()
        console.log("Connection ended");
    }
}

main();

// const insertUser = async () => {
//     try {
//         await client.connect();
//         console.log("Connected to PostgreSQL");

//         await client.query(
//             `INSERT INTO users (name, email, password)
//             VALUES("Rohit", "rohit@gmail.com", "rohit@123")
//             `
//         );

//         console.log("New User Inserted");

//     } catch (error) {
//         console.log(error);
//     } finally {
//         await client.end()
//         console.log("connection ended");
//     }
// }

// insertUser();