// const mysql = require("mysql");
import mysql from "mysql";

export const db = mysql.createConnection({
// const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "Abhishek@123Mysql",
    database : "blogapp"
});


// module.exports = db; 