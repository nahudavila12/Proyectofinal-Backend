import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary: 'signIn / Login'})
  @ApiResponse({status:200, description:'User logged in correctly'})
  @Post('signin')
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.signIn(loginUserDto);
  }

  @ApiOperation({summary: 'signUp / Register'})
  @ApiResponse({status:200, description:'User created correctly'})
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({summary: 'Login with Google'})
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    // Redirige a Google para autenticarse
  }

  @ApiOperation({summary: 'Google callback'})
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req) {
    return this.authService.googleAuth(req);
  }

  @ApiOperation({summary: 'Refresh Token'})
  @ApiResponse({status:200, description:'New access and refresh tokens generated'})
  @Post('refresh-token')
  async refreshToken(@Body('token') token: string) {
    return this.authService.refreshToken(token);
  }
}
