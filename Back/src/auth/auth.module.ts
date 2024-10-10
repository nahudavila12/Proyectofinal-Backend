
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module'; 

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';  
import { config as dotenvConfig } from 'dotenv';
import { CloudinaryModule } from 'src/commons/cloudinary.module';
import { EmailService } from 'src/email/services/email/email.service';
import { Email } from 'src/email/providers/email/email';

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
    CloudinaryModule
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailService, Email],
})
export class AuthModule {}
