import { IsEnum } from "class-validator";
import { IRol } from "src/users/user.entity";

export class UpdateRoleDto {
    @IsEnum(IRol)
    rol: IRol;
  }