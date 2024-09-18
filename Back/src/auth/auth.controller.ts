import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginUserDto } from '../dtos/LoginUser.dto';
import { CreateUserDto } from '../dtos/CreateUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBearerAuth()
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @Post('signup')
  @ApiOperation({ summary: 'Registrarse' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUp(createUserDto);
  }
}
