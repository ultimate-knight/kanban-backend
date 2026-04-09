require("dotenv").config()
const dbConnect=require("./Config/db")

const app=require("./app")

const PORT=process.env.PORT || 5000;

dbConnect()


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})