import { Request, Response } from 'express'
import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10)

        const data = await User.create({ email, password: hashed });

        res.status(200).json(data)
        
    } catch (error: any) {
        console.log("error", error)
        res.status(500).json({ msg: error.message })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ msg: "user not found" })
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({ msg: "invalid user credentials" })
            return
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string)

        res.status(201).json({ token })
    } catch (error: any) {
        console.log("error", error)
        res.status(500).json({ msg: error.message })
    }
}
