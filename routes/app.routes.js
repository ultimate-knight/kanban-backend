const express=require("express")
const router=express.Router()
const auth=require("../middlewares/auth")
const {createApp,getApp,updateApp,deleteApp}=require("../controllers/app.controller")

router.use(auth)

router.post("/", createApp);
router.get("/", getApp);
router.put("/:id", updateApp);
router.delete("/:id", deleteApp);

module.exports = router;