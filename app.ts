import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes'
import appRoutes from './routes/app.routes'
import aiRoutes from './routes/ai.routes'

dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)

app.use("/api/applications", appRoutes);

app.use("/api/ai", aiRoutes);

export default app
