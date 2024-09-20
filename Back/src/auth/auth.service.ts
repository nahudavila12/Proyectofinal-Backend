import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service'; 
import { LoginUserDto } from 'src/dtos/LoginUser.dto';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async signIn(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    if (!email || !password) {
      throw new UnauthorizedException('El email y la contraseña son requeridos.');
    }
    const user= await this.usersService.findByEmail(email)

    if(!user) throw new BadRequestException ('Credenciales invalidas')


    const validPassword = await bcrypt.compare(password, user.password)
  
    if(!validPassword) throw new BadRequestException ('Credenciales invalidas')
    
    const payload = {
      id: user.id,
      email:user.email,
      isAdmin: user.isAdmin
    }

    const token = this.jwtService.sign(payload)

    return {
      message: "usuario logueado",
      token
    }

  }

} 