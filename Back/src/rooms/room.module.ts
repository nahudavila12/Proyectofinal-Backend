import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomsController } from './rooms.controller';
import { RoomRepository } from './room.Repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { RoomImg } from './roomImg.entity';
import { Property } from 'src/properties/property.entity';
import { PropertyRepository } from 'src/properties/property.repository';

@Module({
    imports: [
      TypeOrmModule.forFeature([Room, RoomImg, Property])
  ],
  providers: [RoomService, RoomRepository],
  controllers: [RoomsController]
})
export class RoomsModule {}
