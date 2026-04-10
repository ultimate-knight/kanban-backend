const express=require("express")
const cors=require("cors")

const app=express()

app.use(express.json())
app.use(cors())

app.use("/api/auth",require("./routes/auth.routes"))

app.use("/api/applications", require("./routes/app.routes"));

app.use("/api/ai", require("./routes/ai.routes"));

module.exports=app