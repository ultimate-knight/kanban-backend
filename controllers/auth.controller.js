const User=require("../models/user.model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")


exports.register=async (req,res)=>{
 const {email,password}=req.body;

 const hashed=await bcrypt.hash(password,10)

 const data=await User.create({email,password:hashed});

 return res.status(200).json(data)
}

exports.login=async (req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne(email);

    if(!user){
        return res.status(400).json({msg:"user not found"})
    }

    const isMatch=await bcrypt.compare(user.password,password)

    if(!isMatch){
        return res.status(400).json({msg:"invalid user credentials"})
    }

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

    return res.status(201).json({token})
}