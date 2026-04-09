const User=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


exports.register=async (req,res)=>{
    try {
        const {email,password}=req.body;

 const hashed=await bcrypt.hash(password,10)

 const data=await User.create({email,password:hashed});

 res.status(200).json(data)
        
    } catch (error) {
        console.log("error",error)
        res.status(500).json({msg:error.message})
    }
 
}

exports.login=async (req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({msg:"user not found"})
    }

    const isMatch=await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({msg:"invalid user credentials"})
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

    return res.status(201).json({token})
}