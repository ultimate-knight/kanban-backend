import express, { Router } from "express";
import { login, me, register } from "../controllers/auth.controller";
import auth from "../middlewares/auth";

const router: Router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, me);

export default router;
