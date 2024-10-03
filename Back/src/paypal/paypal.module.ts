import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/payments/payment.entity';
import { Room } from 'src/rooms/room.entity';
import { User } from 'src/users/user.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Payment,
    Room,
    User,
    Reservation,
    OrderDetail
  ])],
  providers: [PaypalService],
  controllers: [PaypalController],
})
export class PaymentsModule {}
