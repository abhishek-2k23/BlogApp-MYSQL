// const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
// const connectionURL = `mysql://root:xnOf3hn3xHhzPMqEx40o@containers-us-west-49.railway.app:5790/railway`;
export const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

// module.exports = db; 