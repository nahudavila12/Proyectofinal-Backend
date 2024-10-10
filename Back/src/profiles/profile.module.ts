import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { ProfilesService } from './profile.service';
import { ProfilesController } from './profile.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryRepository } from 'src/cloudinary/cloudinary.repository';
import { Property } from 'src/properties/property.entity';
import { PropertyImg } from 'src/properties/propertyImg.entity';
import { Room } from 'src/rooms/room.entity';
import { RoomImg } from 'src/rooms/roomImg.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile, Property, PropertyImg, Room, RoomImg, PropertyImg]),
    ],
    providers: [
        ProfileRepository, 
        ProfilesService,
        CloudinaryService,
        CloudinaryRepository
    ],
    exports: [ProfileRepository],
    controllers: [ProfilesController], 
})
export class ProfileModule {}