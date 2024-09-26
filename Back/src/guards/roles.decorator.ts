import { SetMetadata } from '@nestjs/common';
import { IRol } from 'src/users/user.entity'; // Importamos el enum desde la entidad de usuarios

export const ROLES_KEY = 'roles';
export const Roles = (...roles: IRol[]) => SetMetadata(ROLES_KEY, roles);
