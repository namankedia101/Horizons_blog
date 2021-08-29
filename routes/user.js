import express from "express";
import {signIn, signUp} from "../controllers/user.js";


const router = express.Router();

router.post("/api/signup", signUp);
router.post("/api/signin", signIn);

export default router;