import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './property.entity';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Owner } from 'src/owners/owner.entity';
import { PropertyImg } from './propertyImg.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Room } from 'src/rooms/room.entity';
import { RoomImg } from 'src/rooms/roomImg.entity';
import { User } from 'src/users/user.entity';
import { Profile } from 'src/profiles/profile.entity';
import { CloudinaryRepository } from 'src/cloudinary/cloudinary.repository';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { UserRepository } from 'src/users/user.repository';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, PropertyImg, Room, Owner, User, Profile, RoomImg]),
  ],
  providers: [
    PropertyService,
    PropertyRepository,
    CloudinaryService,
    CloudinaryRepository,
    JwtService,
    UserService,
    UserRepository,
    ProfileRepository,
    CloudinaryConfig,
  ],
  controllers: [PropertyController],
  exports: [PropertyService, PropertyRepository],
})
export class PropertyModule {}