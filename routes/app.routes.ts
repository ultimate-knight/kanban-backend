import express, { Router } from 'express'
import auth from '../middlewares/auth'
import { createApp, getApp, updateApp, deleteApp } from '../controllers/app.controller'

const router: Router = express.Router()

router.use(auth)

router.post("/", createApp);
router.get("/", getApp);
router.put("/:id", updateApp);
router.delete("/:id", deleteApp);

export default router;

router.post("/", createApp);
router.get("/", getApp);
router.put("/:id", updateApp);
router.delete("/:id", deleteApp);

module.exports = router;