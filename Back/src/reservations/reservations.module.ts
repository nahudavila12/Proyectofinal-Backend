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
import { OrderDetailRepository } from 'src/orderDetail/orderDetail.repository';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { CloudinaryService } from 'src/commons/cloudinary.service';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { Profile } from 'src/profiles/profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([
        Property,
        User,
        Room,
        OrderDetail,
        Reservation,
        Profile
    ])],
    controllers: [ReservationController],
    providers: [
        ReservationService, 
        OrderDetailRepository, 
        JwtService, 
        UserService, 
        CloudinaryService, 
        ProfileRepository,
        UserRepository    
    ],
    
})
export class ReservationsModule {}
