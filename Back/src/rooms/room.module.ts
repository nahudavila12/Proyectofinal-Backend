import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRepository } from './room.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomImg } from './roomImg.entity';
import { Property } from 'src/properties/property.entity';
import { RoomController } from './room.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryRepository } from 'src/cloudinary/cloudinary.repository';
import { PropertyImg } from 'src/properties/propertyImg.entity';
import { Profile } from 'src/profiles/profile.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([Room, RoomImg, Property, PropertyImg, Profile])
  ],
  providers: [
    RoomService, 
    RoomRepository,
    CloudinaryService,
    CloudinaryRepository
  ],
  controllers: [RoomController],
})
export class RoomsModule {}
