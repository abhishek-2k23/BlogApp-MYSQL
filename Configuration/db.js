// const mysql = require("mysql");
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();
const connectionURL = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export const db = mysql.createConnection(connectionURL);

// module.exports = db; 