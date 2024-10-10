import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; 
import { UserRepository } from './user.repository'; 
import { ProfileRepository } from 'src/profiles/profile.repository';
import { Profile } from 'src/profiles/profile.entity';
import { EmailModule } from 'src/email/email.module';
import { CloudinaryService } from '../cloudinary/cloudinary.service'; // Importación de CloudinaryService
//import { FileUploadModule } from '../file-upload/file-upload.module'; // Importación del módulo de carga de archivos
import { JwtService } from '@nestjs/jwt';
import { CloudinaryRepository } from 'src/cloudinary/cloudinary.repository';
import { PropertyRepository } from 'src/properties/property.repository';
import { Property } from 'src/properties/property.entity';
import { PropertyImg } from 'src/properties/propertyImg.entity';
import { RoomRepository } from 'src/rooms/room.Repository';
import { Room } from 'src/rooms/room.entity';
import { RoomImg } from 'src/rooms/roomImg.entity';
import { OwnerRepository } from 'src/owners/owner.repository';
import { Owner } from 'src/owners/owner.entity';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Property, PropertyImg, Room, RoomImg, Owner]), EmailModule], 
  controllers: [UsersController],
  providers: [
    UserService, 
    UserRepository, 
    ProfileRepository, 
    CloudinaryService, 
    JwtService, 
    CloudinaryRepository,
    PropertyRepository,
    RoomRepository,
    CloudinaryConfig
  ], 
  exports: [UserService]
})
export class UserModule {}
