// src/middlewares/globalErrorHandler.ts
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages: any = [];

    // Handle Zod Validation Errors
    if (err instanceof ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errorMessages = err.issues.map((issue) => ({
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }));
    }
    // Handle standard JavaScript Errors
    else if (err instanceof Error) {
        message = err.message;
        errorMessages = err.message ? [{ path: '', message: err.message }] : [];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorMessages,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
    });
};

export default globalErrorHandler;