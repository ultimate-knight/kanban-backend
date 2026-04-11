import { Request, Response } from 'express'
import Application from '../models/app.models'

export const createApp = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await Application.create({
            ...req.body,
            userId: (req as any).user
        })

        if (!data) {
            res.status(400).json({ Message: "data is not available" })
            return
        }

        res.status(201).json({ result: data })
    } catch (error: any) {
        console.log("error", error.message)
        res.status(500).json({ Message: error.message })
    }
}

export const getApp = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await Application.find({})

        if (!data) {
            res.status(400).json({ Message: "data is not available" })
            return
        }

        res.status(200).json({ result: data })
    } catch (error: any) {
        console.log("error", error.message)
        res.status(500).json({ Message: error.message })
    }
}

export const updateApp = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await Application.findByIdAndUpdate(
            {
                _id: req.params.id,
                userId: (req as any).userId 
            },
            req.body,
            { new: true }          
        )

        if (!data) {
            res.status(400).json({ Message: "data cannot be updated" })
            return
        }

        res.status(200).json(data)
        
    } catch (error: any) {
        console.log("error", error.message)
        res.status(500).json({ Message: error.message })
    }
}

export const deleteApp = async (req: Request, res: Response): Promise<void> => {
    try {
        await Application.findByIdAndDelete({
            _id: req.params.id
        })

        res.status(200).json({ Message: "message deleted successfully" })
        
    } catch (error: any) {
        console.log("error", error.message)
        res.status(500).json({ Message: error.message })
    }
}
