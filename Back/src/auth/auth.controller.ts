import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { LoginUserDto } from '../dtos/LoginUser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'signIn / Login'})
  @ApiResponse({status:200, description:'user logged in correctly'})
  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }
  @ApiOperation({summary: 'signUp / register'})
  @ApiResponse({status:200, description:'user created correctly'})
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.singUp(createUserDto);
  }
}
