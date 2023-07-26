import express from "express"
import { addPost } from "../Controllers/post.js";

const router = express.Router();

router.get("/",addPost);

export default router;