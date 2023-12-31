import { NextFunction, Request, Response } from "express";

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    
    const statusCode: number = err.statusCode || 500;
  
    const errorResponse = {
      error: {
        message: err.message || "Internal Server Error",
      },
    };
  
    res.status(statusCode).json(errorResponse);
};