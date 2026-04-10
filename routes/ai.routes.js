const express=require("express")
const router=express.Router()
const ctrl=require("../controllers/ai.controller")


router.post("/parse",ctrl.parse)

module.exports=router
