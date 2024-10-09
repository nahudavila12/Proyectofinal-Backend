import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomRepository } from './room.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomImg } from './roomImg.entity';
import { Property } from 'src/properties/property.entity';


@Module({
    imports: [
      TypeOrmModule.forFeature([Room, RoomImg, Property])
  ],
  providers: [RoomService, RoomRepository],
})
export class RoomsModule {}
