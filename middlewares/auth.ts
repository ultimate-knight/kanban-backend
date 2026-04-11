import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const auth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        res.status(401).json({ Message: "Invalid token" })
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload & { id: string }
        (req as any).user = decoded.id
        next()
    } catch (error: any) {
        res.status(500).json({ Msg: error.message })
    }
}

export default auth
