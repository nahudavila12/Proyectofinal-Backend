import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
]) {}
