import express from "express";
import { getPosts, addPost, deletePost, editPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", editPost);

export default router;
