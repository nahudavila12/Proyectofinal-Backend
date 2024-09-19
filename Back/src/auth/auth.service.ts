import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service'; 
import { LoginUserDto } from 'src/dtos/LoginUser.dto'; //necesito los DTO
import { Users } from 'src/users/entities/users.entity';//necesito las entitiess
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

  async singUp (user:Partial<Users>){
    const { email,password } = user 

    const foundUser = await this.usersService.findByEmail(email)

    if (foundUser) throw new BadRequestException ('El email ya se encuentra registrado')

    const hashedPassword= await bcrypt.hash(password, 10);

    return await this.usersService.addUser({ ...user, password: hashedPassword });
  }
}