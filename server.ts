import dotenv from 'dotenv'
import dbConnect from './Config/db'
import app from './app'

dotenv.config()

const PORT = process.env.PORT || 5000;

dbConnect()

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
