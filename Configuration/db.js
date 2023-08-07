// const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

// module.exports = db; 