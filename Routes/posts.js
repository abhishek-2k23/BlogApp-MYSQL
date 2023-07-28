import express from "express";
import {
  addPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../Controllers/post.js";

const router = express.Router();

router.get("/addPost", addPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/:id", deletePost);
router.get("/:id", updatePost);

export default router;
