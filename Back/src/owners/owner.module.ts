import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner.entity';
import { Property } from 'src/properties/property.entity';
import { User } from 'src/users/user.entity';
import { OwnerRepository } from './owner.repository';
import { OwnerController } from './owner.controller';
import { PropertyService } from 'src/properties/property.service';
import { RoomService } from 'src/rooms/room.service';
import { PropertyRepository } from 'src/properties/property.repository';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RoomRepository } from 'src/rooms/room.Repository';
import { Room } from 'src/rooms/room.entity';
import { RoomImg } from 'src/rooms/roomImg.entity';
import { PropertyImg } from 'src/properties/propertyImg.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { Profile } from 'src/profiles/profile.entity';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { UserRepository } from 'src/users/user.repository';
import { CloudinaryRepository } from 'src/cloudinary/cloudinary.repository';
import { PropertyModule } from 'src/properties/property.module';
import { CloudinaryConfig } from 'src/config/cloudinary.config';


@Module({
  imports: [
    TypeOrmModule.forFeature([Owner, Property, User, Profile, Room, RoomImg, PropertyImg]),
    PropertyModule
  ],
  providers: [OwnerService, 
    OwnerRepository,
    RoomService, 
    PropertyRepository, 
    CloudinaryService, 
    RoomRepository,
    JwtService,
    UserService,
    ProfileRepository,
    UserRepository,
    CloudinaryRepository,
    CloudinaryConfig
  ],
  controllers:[OwnerController],
  exports: [OwnerService, OwnerRepository]
})
export class OwnersModule {}
