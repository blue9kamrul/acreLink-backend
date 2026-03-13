import { prisma } from '../../lib/db';
import { Role } from '../../../prisma/generated/prisma-client/client';

const getUserProfileFromDB = async (userId: string) => {
    const result = await prisma.user.findUnique({
        where: { id: userId },
        include: { spaces: true, leases: true } // Fetch their related AcreLink data
    });
    return result;
};

const updateUserRoleIntoDB = async (userId: string, payload: { role: Role }) => {
    const result = await prisma.user.update({
        where: { id: userId },
        data: { role: payload.role },
    });
    return result;
};

export const UserService = {
    getUserProfileFromDB,
    updateUserRoleIntoDB,
};