import express, { Router } from "express";
import { parseJobDescriptionController } from "../controllers/ai.controller";
import auth from "../middlewares/auth";

const router: Router = express.Router();

router.use(auth);
router.post("/parse", parseJobDescriptionController);

export default router;
