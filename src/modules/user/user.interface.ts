
export type TRole = 'LANDOWNER' | 'GROWER' | 'INSPECTOR' | 'ADMIN';

export interface IUpdateUserRolePayload {
    role: TRole;
}