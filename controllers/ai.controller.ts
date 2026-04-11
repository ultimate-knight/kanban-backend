import { Request, Response } from 'express'
import { parseJD } from '../services/ai.service'

export const parse = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await parseJD(req.body.jd)

        res.json(data)
    } catch (error: any) {
        console.log("AI Service Error:", error);
        
        // Check for quota/rate limit errors
        if (error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("RESOURCE_EXHAUSTED")) {
            res.status(429).json({ 
                msg: "Daily quota exceeded. Please try again tomorrow or upgrade your Google API plan.",
                error: error.message 
            });
            return
        }
        
        res.status(500).json({ msg: error.message || "AI error" });
    }
}