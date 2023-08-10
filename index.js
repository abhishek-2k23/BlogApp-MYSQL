// const express = require("express");
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./Configuration/db.js";
import postRoutes from "./Routes/posts.js";
import authRoutes from "./Routes/auth.js";
import usersRoutes from "./Routes/auth.js";
import cookieParser from "cookie-parser";
import multer from "multer"; //To import the file on the server
import fileUpload from "express-fileupload";
// import cloudinary from './Configuration/cloudinary.js';

// const db = require("./Configuration/db");
dotenv.config();
const app = express();

// parser
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(fileUpload());

//db connection
db.connect((err) => {
  if (err) {
    console.log("Error in connecting the db.",err.message);
  } else {
    console.log("DB connnected.");
  }
});

// cloudinary connection 
// cloudinary.cloudinaryConnect();

//server up
app.listen(process.env.PORT, () => {
  console.log("server started at : ",process.env.PORT);
});

//homepage test
app.get("/", (req, res) => {
  res.send("server is running smoothly.");
});

//Routes
app.use("/api/post", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

//file uploading on the server 
//isse v use kro agr extensioin chahte ho to
const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'../frontend/public/uploads');
  },
  filename: function(req,file,cb){
    cb(null,Date.now()+file.originalname)
  }
})

// const upload = multer({dest : "./uploads/"}); //sets the destination
const upload = multer({storage}) //storage defined in the storage
//post the file : iss tarike me extension name add nhi hoga
app.post("/api/upload",upload.single('file'),function(req,res) {
  const file = req.file;
  res.status(200).json(file?.filename)
})

