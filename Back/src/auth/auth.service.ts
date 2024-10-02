import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../users/user.service'; 
import { LoginUserDto } from 'src/dtos/LoginUser.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { CloudinaryService } from 'src/commons/cloudinary.service'; // Importar CloudinaryService

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    if (!email || !password) {
      throw new UnauthorizedException('El email y la contraseña son requeridos.');
    }
    const user = await this.usersService.findByEmail(email);
    
    if (!user) throw new BadRequestException('Usuario no encontrado');

    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) throw new BadRequestException('Credenciales inválidas');
    
    return this.generateTokens(user);
  }

  async signUp(user: CreateUserDto, file?: Express.Multer.File) {
    const { email } = user;

    const foundUser = await this.usersService.findByEmail(email);
    if (foundUser) throw new BadRequestException('El email ya se encuentra registrado');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const createdUser = await this.usersService.addUser({ ...user, password: hashedPassword });

    // Cargar la imagen a Cloudinary si existe
    let userImageUrl = '';
    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      userImageUrl = uploadResult.secure_url;
    }

    // Actualizar el perfil del usuario con la URL de la imagen
    await this.usersService.updateUserProfileImage(createdUser.uuid, userImageUrl);

    return createdUser; // Retornar el usuario creado
  }


  async googleAuth(req: any) {
    const userProfile = req.user; 
    return this.handleOAuthUser(userProfile);
  }

  private async handleOAuthUser(userProfile: any): Promise<{ message: string; generateAccessToken: string; generateRefreshToken: string }> {
    const { email, given_name, family_name } = userProfile._json;

    let user: User = await this.usersService.findByEmail(email);
    if (!user) {
      const newUser: CreateUserDto = {
        email: email,
        password: 'password',
        user_name: `${given_name}`,
        firstName: family_name,
        lastName: family_name,
    };
      user = await this.usersService.addUser(newUser);
    }

    return this.generateTokens(user);
  }

  public generateTokens(user: User) {
    const payload = {
      uuid: user.uuid,
      email: user.email,
      rol: user.rol,
    };

    const generateAccessToken = this.jwtService.sign(payload, { expiresIn: '15m' }); 
    const generateRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      message: "Usuario autenticado",
      generateAccessToken,
      generateRefreshToken,
    };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findByEmail(payload.email);
      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      return this.generateTokens(user);
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
