import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; 
import { UserRepository } from './user.repository'; 
import { ProfileRepository } from 'src/profiles/profile.repository';
import { Profile } from 'src/profiles/profile.entity';
import { EmailModule } from 'src/email/email.module';
import { CloudinaryService } from '../commons/cloudinary.service'; // Importación de CloudinaryService
import { FileUploadModule } from '../file-upload/file-upload.module'; // Importación del módulo de carga de archivos

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile]), EmailModule, FileUploadModule], // Agregado FileUploadModule
  controllers: [UsersController],
  providers: [UserService, UserRepository, ProfileRepository, CloudinaryService], // Agregado CloudinaryService
  exports: [UserService]
})
export class UserModule {}
