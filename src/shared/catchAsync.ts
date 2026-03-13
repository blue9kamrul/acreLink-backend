// src/shared/catchAsync.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';

const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error); // Passes the error to the global error handler
        }
    };
};

export default catchAsync;