import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/payments/payment.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/user.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { ReservationService } from 'src/reservations/reservation.service';
import { Property } from 'src/properties/property.entity';
import { OrderDetailRepository } from 'src/orderDetail/orderDetail.repository';
import { EmailModule } from 'src/email/email.module';


@Module({
  imports: [TypeOrmModule.forFeature([
    Payment,
    Room,
    User,
    Reservation,
    OrderDetail,
    Property
  ]),
  EmailModule],
  providers: [
    PaypalService,
    ReservationService,
    OrderDetailRepository],
  controllers: [PaypalController],
})
export class PaymentsModule {}
