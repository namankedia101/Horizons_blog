import express from "express";
import {getPost ,getPosts, createPost, updatePost, deletePost, commentPost, deleteComment} from "../controllers/posts.js";
import auth from "../middleware/middleware.js";

const router = express.Router();

//GET requests
router.get("/api/post/:id", getPost);
router.get("/api/posts" , getPosts);

//POST requests
router.post("/api/newPost",auth, createPost); //(only allowed to creators)
router.post("/api/commentPost", commentPost);

//DELETE requests
router.delete("/api/:id", deletePost);//(only allowed to creators)
router.delete("/api/:id/deleteComment", deleteComment)

//UPDATE requests
router.patch("/api/:id", updatePost); //(only allowed to creators)
router.patch("/api/commentPost", commentPost);

export default router;