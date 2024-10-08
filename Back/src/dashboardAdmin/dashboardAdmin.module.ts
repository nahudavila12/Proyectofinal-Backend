import { Module } from '@nestjs/common';
import { OwnerService } from 'src/owners/owner.service';
import { PropertyService } from 'src/properties/property.service';
import { ReservationService } from 'src/reservations/reservation.service';
import { UserService } from 'src/users/user.service';
import { AdminController } from './dashboardAdmin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from 'src/owners/owner.entity';
import { OwnerRepository } from 'src/owners/owner.repository';
import { PropertyRepository } from 'src/properties/property.repository';
import { CloudinaryService } from 'src/commons/cloudinary.service';
import { OrderDetailRepository } from 'src/orderDetail/orderDetail.repository';
import { Reservation } from 'src/reservations/reservation.entity';
import { UserRepository } from 'src/users/user.repository';
import { User } from 'src/users/user.entity';
import { RoomRepository } from 'src/rooms/room.Repository';
import { Room } from 'src/rooms/room.entity';
import { Property } from 'src/properties/property.entity';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { PropertyImg } from 'src/properties/propertyImg.entity';
import { RoomImg } from 'src/rooms/roomImg.entity';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { Profile } from 'src/profiles/profile.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';  // Asegúrate de que la ruta sea correcta

@Module({
  imports: [
    TypeOrmModule.forFeature([Owner, Reservation, User, Room, Property, PropertyImg, RoomImg, OrderDetail, Profile]),
    EmailModule,  // Agregar EmailModule aquí
  ],
  controllers: [AdminController],
  providers: [
    OwnerService,
    PropertyService,
    ReservationService,
    UserService,
    OwnerRepository,
    PropertyRepository,
    CloudinaryService,
    OrderDetailRepository,
    UserRepository,
    RoomRepository,
    ProfileRepository,
    JwtService,
  ],
})
export class DashboardAdminModule {}
