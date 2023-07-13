import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['api-key'];
    
    if (apiKey && apiKey === process.env.API_KEY) {
      next();
    } else {
      res.status(401).json({ error: 'Invalid API key' });
    }
};