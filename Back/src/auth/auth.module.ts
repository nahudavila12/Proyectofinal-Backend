 import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])], //establecer users luego 
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {} 