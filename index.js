// const express = require("express");
import express from "express";
import cors from "cors";
import { db } from "./Configuration/db.js";
import postRoutes from "./Routes/posts.js";
import authRoutes from "./Routes/auth.js";
import usersRoutes from "./Routes/auth.js";
// const db = require("./Configuration/db");

const app = express();

//json parser
app.use(express.json());
app.use(cors());
//db connection
db.connect((err) => {
  if (err) {
    console.log("Error in connecting the db.");
  } else {
    console.log("DB connnected.");
  }
});

//server up
app.listen(8800, () => {
  console.log("server started.");
});

//homepage test
app.get("/", (req, res) => {
  res.send("server is running smoothly.");
});

//post test
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
