import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { Property } from 'src/properties/property.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/user.entity';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { UserRepository } from 'src/users/user.repository';
import { RoomRepository } from 'src/rooms/room.Repository';
import { PropertyRepository } from 'src/properties/property.repository';
import { Reservation } from './reservation.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Property,
        User,
        Room,
        OrderDetail,
        Reservation
    ])],
    controllers: [ReservationController],
    providers: [
        ReservationService,    
    ],
    
})
export class ReservationsModule {}
