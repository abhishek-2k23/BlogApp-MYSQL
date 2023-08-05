// const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection(process.env.DB_URL);

// module.exports = db; 