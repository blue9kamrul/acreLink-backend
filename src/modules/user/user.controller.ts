import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserValidation } from './user.validation';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserService.getUserProfileFromDB(userId as string);

    if (!result) {
        throw new Error('User not found'); // The global handler will catch this!
    }

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User fetched successfully',
        data: result,
    });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
    // Zod validation (If it fails, global error handler catches it)
    const validatedData = UserValidation.updateRoleZodSchema.parse({ body: req.body });
    const { userId } = req.params;

    const result = await UserService.updateUserRoleIntoDB(userId as string, validatedData.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User role updated successfully',
        data: result,
    });
});

export const UserController = {
    getUserProfile,
    updateUserRole,
};