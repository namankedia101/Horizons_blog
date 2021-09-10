import express from "express";
import {signIn, signUp, verifyUser, verifying} from "../controllers/user.js";

const router = express.Router();

router.post("/api/signup", signUp);
router.post("/api/signin", signIn);
router.get("/api/auth/verification/verify-account/:userId/:secretCode", verifying);
router.post("/api/auth/verification/verify-account", verifyUser);

export default router;