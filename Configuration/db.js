// const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";

const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
    // SSL configuration for secure connections (required for managed databases on Render)
    ca: process.env.RENDER_CONNECT_CA, // This is provided by Render for SSL connections
  },
}
export const db = mysql.createConnection({dbconfig});

// module.exports = db; 