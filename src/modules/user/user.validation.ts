
import { z } from 'zod';

const updateRoleZodSchema = z.object({
    body: z.object({
        role: z.enum(['LANDOWNER', 'GROWER'] as const),
    }),
});

// allow assigning INSPECTOR or ADMIN roles only from admin endpoints, not from this general user role update endpoint

export const UserValidation = {
    updateRoleZodSchema,
};