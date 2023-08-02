import express from "express"
import { register, login, logout} from "../Controllers/auth.js";
const router = express.Router();

router.get("/",(req,res) =>{
    res.send("AUTH page working smoothly");
});

//importing the controllers
router.post("/register",register);
router.post("/login",login);
router.post("/logout",logout);

export default router;