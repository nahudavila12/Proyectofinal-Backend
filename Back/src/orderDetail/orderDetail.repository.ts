import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/rooms/room.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { CreateOrderDetailDto } from 'src/dtos/createOrderDetail.dto';
import { Property } from 'src/properties/property.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { Payment } from 'src/payments/payment.entity';


@Injectable()
export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
  ) {}

  async createOrderDetail(
    user: User, 
    propertyName: string, 
    reservation: Reservation, 
    total: number,
    payment: Payment
) {
    const newOrderDetail: CreateOrderDetailDto = {
        date: new Date(),
        user: user,
        propertyName: propertyName, 
        room_total: total,
        total: total,
        reservation: reservation,
        payment: payment
    };

    await this.orderDetailRepository.save(newOrderDetail);
    
}

}