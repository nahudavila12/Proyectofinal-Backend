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

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    if (!email || !password) {
      throw new UnauthorizedException('El email y la contraseña son requeridos.');
    }
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new BadRequestException('Credenciales inválidas');

    const validPassword = await bcrypt.compare(password, user.password);
  
    if (!validPassword) throw new BadRequestException('Credenciales inválidas');
    
    return this.generateTokens(user);
  }

  async signUp(user: Partial<User>) {
    const { email, password } = user;

    const foundUser = await this.usersService.findByEmail(email);
    if (foundUser) throw new BadRequestException('El email ya se encuentra registrado');

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersService.addUser({ ...user, password: hashedPassword });
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
        name: `${given_name} ${family_name}`,
        password: 'password',  
      };
      user = await this.usersService.addUser(newUser);
    }

    return this.generateTokens(user);
  }

  public generateTokens(user: User) {
    const payload = {
      uuid: user.uuid,
      email: user.email,
      isAdmin: user.isAdmin,
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
