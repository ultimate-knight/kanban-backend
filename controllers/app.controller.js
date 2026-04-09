const Application=require("../models/app.models")

exports.createApp=async (req,res)=>{
    try {
        const data=await Application.create({
            ...req.body,
            userId:req.user
        })

        if(!data){
            res.status(400).json({Message:"data is not available"})
        }

        res.status(201).json({result:data})
    } catch (error) {
        console.log("error",error.Message)
        res.status(500).json({Message:error.Message})
    }
}



exports.getApp=async (req,res)=>{
    try {
        const data=await Application.findOne({
            ...req.body,
            userId:req.user
        })

        if(!data){
            res.status(400).json({Message:"data is not available"})
        }

        res.status(201).json({result:data})
    } catch (error) {
        console.log("error",error.Message)
        res.status(500).json({Message:error.Message})
    }
}


exports.updateApp=async (req,res)=>{
    try {
        const data=await Application.findByIdAndUpdate(
            ...req.body,
            req.params.id,
            {new:true}          
        )

         if(!data){
            res.status(400).json({Message:"data cannot be updated"})
        }

        res.status(201).json(data)
        
    } catch (error) {
         console.log("error",error.Message)
        res.status(500).json({Message:error.Message})
    }
}



exports.deleteApp=async (req,res)=>{
    try {
        await Application.findByIdAndDelete(
            req.params.id
        )

       
        res.status(201).json({Message:"message deleted successfully"})
        
    } catch (error) {
         console.log("error",error.Message)
        res.status(500).json({Message:error.Message})
    }
}



