import { Controller, Post, Body, UseGuards,  UseInterceptors, UploadedFile, UnauthorizedException, InternalServerErrorException, HttpStatus, ConflictException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from '../dtos/loginUser.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/CreateUser.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { Template } from 'src/email/enums/template.enum';
import { EmailService } from 'src/email/services/email/email.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {}


  
  @ApiOperation({ summary: 'signIn / Login' })
  @ApiResponse({ status: 200, description: 'User logged in correctly' })
  @Post('signin')
  @UseGuards(AuthGuard) 
  async signIn(@Body() loginUserDto: LoginUserDto) {
      try {
          return await this.authService.signIn(loginUserDto);
      } catch (error) {
          if (error instanceof UnauthorizedException) {
              throw new UnauthorizedException('Credenciales incorrectas');
          }
          console.error('Error durante el inicio de sesión:', error.message);
          throw new InternalServerErrorException('Error al intentar iniciar sesión');
      }
  }




  @ApiOperation({ summary: 'signUp / Register' })
@ApiResponse({ status: 200, description: 'User created correctly' })
@Post('signup')
@UseInterceptors(FileInterceptor('file')) 
async signUp(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File
) {
    try {
        const user = await this.authService.signUp(createUserDto, file);

        const emailSent = await this.emailService.sendEmail({
            from: "mekhi.mcdermott@ethereal.email",
            subjectEmail: "Te damos la bienvenida a Nuestro Sitio",
            sendTo: createUserDto.email,
            template: Template.WELCOME,
            params: {
                name: createUserDto.firstName
            }
        });

        if (!emailSent) {
            throw new InternalServerErrorException('Error al enviar el correo de bienvenida.');
        }

        return {
            statusCode: HttpStatus.CREATED,
            message: 'Usuario creado correctamente',
            user, 
        };
    } catch (error) {
        if (error instanceof ConflictException) {
            throw new ConflictException(error.message);
        }
        console.error('Error durante el registro:', error.message);
        throw new InternalServerErrorException('Error al registrar el usuario.', error.message);
    }
}




/*   @ApiOperation({summary: 'Login with Google'})
  @Get('google')
  async googleLogin() {
  }

  @ApiOperation({summary: 'Google callback'})
  @Get('google/callback')
  async googleLoginCallback(@Req() req) {
    return this.authService.googleAuth(req);
  } */

  @ApiOperation({summary: 'Refresh Token'})
  @ApiResponse({status:200, description:'New access and refresh tokens generated'})
  @Post('refresh-token')
  async refreshToken(@Body('token') token: string) {
    return this.authService.refreshToken(token);
  }
}
