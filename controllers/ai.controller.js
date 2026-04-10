const {parseJD}=require("../services/ai.service")

exports.parseJD=async (req,res)=>{
    try {
        const data=await parseJD(req.body.jd)

        res.json(data)
    } catch (error) {
        res.status(500).json({ msg: "AI error" });
    }
}