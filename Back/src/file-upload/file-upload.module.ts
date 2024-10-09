import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomImg } from '../rooms/roomImg.entity'; 
import { PropertyImg } from '../properties/propertyImg.entity'; // Asegúrate de que esta ruta sea correcta
import { CloudinaryService } from '../commons/cloudinary.service';
import { Profile } from 'src/profiles/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { UserRepository } from 'src/users/user.repository';
import { User } from 'src/users/user.entity';
import { ProfileRepository } from 'src/profiles/profile.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RoomImg, PropertyImg, Profile, User])],
    controllers: [FileUploadController],
    providers: [FileUploadService, FileUploadRepository, CloudinaryService, JwtService, UserService, UserRepository, ProfileRepository],
})
export class FileUploadModule {}
