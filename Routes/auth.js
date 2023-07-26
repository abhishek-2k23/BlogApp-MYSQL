import express from "express"
import { register, login} from "../Controllers/auth.js";
const router = express.Router();

//importing the controllers
router.post("/register",register);
router.post("/login",login);


export default router;