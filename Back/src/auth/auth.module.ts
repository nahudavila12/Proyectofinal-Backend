import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module'; 
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';  
import { config as dotenvConfig } from 'dotenv';

dotenvConfig()

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '60s'  }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}