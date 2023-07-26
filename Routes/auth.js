import express from "express"
import { register } from "../Controllers/auth.js";
const router = express.Router();

//importing the controllers
router.post("/register",register)


export default router;