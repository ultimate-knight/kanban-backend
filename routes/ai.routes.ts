import express, { Router } from 'express'
import * as ctrl from '../controllers/ai.controller'

const router: Router = express.Router()

router.post("/parse", ctrl.parse)

export default router
