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
        console.log("error",error.message)
        res.status(500).json({Message:error.message})
    }
}



exports.getApp=async (req,res)=>{
    try {
        const data=await Application.find({
        })

        if(!data){
            res.status(400).json({Message:"data is not available"})
        }

        res.status(200).json({result:data})
    } catch (error) {
        console.log("error",error.message)
        res.status(500).json({Message:error.message})
    }
}


exports.updateApp=async (req,res)=>{
    try {
        const data=await Application.findByIdAndUpdate(
            {
                _id:req.params.id,
                userId: req.userId 
            },
            req.body,
            {new:true}          
        )

         if(!data){
            return res.status(400).json({Message:"data cannot be updated"})
        }

        res.status(200).json(data)
        
    } catch (error) {
         console.log("error",error.message)
        res.status(500).json({Message:error.message})
    }
}



exports.deleteApp=async (req,res)=>{
    try {
        await Application.findByIdAndDelete({
                _id:req.params.id
        }
            
        )

       
        res.status(200).json({Message:"message deleted successfully"})
        
    } catch (error) {
         console.log("error",error.message)
        res.status(500).json({Message:error.message})
    }
}



