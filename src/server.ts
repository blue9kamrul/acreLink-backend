import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Allow the future Next.js frontend
    credentials: true // Crucial for passing session cookies
}));
app.use(express.json());

// BetterAuth Route Handler
app.use("/api/auth", toNodeHandler(auth));

// Basic Route
app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'AcreLink Backend is Live!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});