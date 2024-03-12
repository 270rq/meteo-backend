import { SetMetadata } from '@nestjs/common';
import { TUserRoles } from 'src/enum/user-role';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TUserRoles[]) => SetMetadata(ROLES_KEY, roles);
