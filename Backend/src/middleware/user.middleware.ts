import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const JWT_PASSWORD = process.env.JWT_PASSWORD as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(401).json({
            success: false,
            error: "Unauthtized, token missing or invalid"
        })
    }

    try {
        const decoded = jwt.verify(header, JWT_PASSWORD)
        if (typeof decoded === "string") {
            return res.status(401).json({
                success: false,
                error: "Unauthorized, token missing or invalid"
            })
        }
        (req as any).user = decoded;
        
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized, token missing or invlid"
        });

    }
}