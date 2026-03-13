// src/modules/user/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserValidation } from './user.validation';

const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const result = await UserService.getUserProfileFromDB(userId as string);

        if (!result) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({ success: true, message: 'User fetched successfully', data: result });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch user', error: err });
    }
};

const updateUserRole = async (req: Request, res: Response): Promise<void> => {
    try {
        // 1. Validate the incoming request body using Zod
        const validatedData = UserValidation.updateRoleZodSchema.parse({ body: req.body });

        const { userId } = req.params;

        // 2. Call the service
        const result = await UserService.updateUserRoleIntoDB(userId as string, validatedData.body);

        res.status(200).json({ success: true, message: 'User role updated successfully', data: result });
    } catch (err: any) {
        res.status(400).json({ success: false, message: 'Validation or update failed', error: err.errors || err.message });
    }
};

export const UserController = {
    getUserProfile,
    updateUserRole,
};