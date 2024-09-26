 import { Module } from '@nestjs/common';
 import { AuthService } from './auth.service';
 import { UserModule } from '../users/user.module'; 
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { User } from '../users/user.entity';
import { AuthController } from './auth.controller';

 @Module({
   imports: [UserModule, TypeOrmModule.forFeature([User])],
   controllers: [AuthController],
   providers: [AuthService],
 })
 export class AuthModule {} 