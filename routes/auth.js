import { Router } from "express";
import { register } from "../controllers/auth.js";
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", register);

export default authRouter;
