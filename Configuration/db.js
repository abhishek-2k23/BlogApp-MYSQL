// const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const dbconfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

// Check if the RENDER_CONNECT_CA environment variable is defined (running on Render)
if (process.env.RENDER_CONNECT_CA) {
    dbConfig.ssl = {
      // SSL configuration for secure connections (required for managed databases on Render)
      ca: process.env.RENDER_CONNECT_CA,
    };
}

export const db = mysql.createConnection(dbconfig);

// module.exports = db; 