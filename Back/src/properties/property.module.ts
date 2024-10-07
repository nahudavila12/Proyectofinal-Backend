import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Property } from './property.entity';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Owner } from 'src/owners/owner.entity';
import { PropertyImg } from './propertyImg.entity';
import { CloudinaryService } from 'src/commons/cloudinary.service';
import { Room } from 'src/rooms/room.entity';
import { RoomImg } from 'src/rooms/roomImg.entity';
import { UserService } from 'src/users/user.service';
import { UserRepository } from 'src/users/user.repository';
import { User } from 'src/users/user.entity';
import { Profile } from 'src/profiles/profile.entity';
import { ProfileRepository } from 'src/profiles/profile.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property, 
      Owner, 
      PropertyImg,
      Room,
      RoomImg,
      User,
      Profile
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    PropertyService, 
    PropertyRepository, 
    CloudinaryService,
    UserService,
    UserRepository,
    ProfileRepository
  ],
  controllers: [PropertyController],
  exports: [PropertyRepository, PropertyService],
})
export class PropertyModule {}
