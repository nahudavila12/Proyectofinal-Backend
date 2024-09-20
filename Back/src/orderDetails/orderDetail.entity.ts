import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Payment } from 'src/payments/payment.entity';
import { AdditionalServiceOrderDetail } from './orderDetailAdditionalService.entity';
import { User } from 'src/users/user.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Orders_details')
export class OrderDetail {
  @ApiProperty({ description: 'orderDetails ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'date of order' })
  @Column()
  date: Date;

  @ApiProperty({ description: 'rooms' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  room_total: number;

  @ApiProperty({ description: 'total services' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  additionals_services_total: number;

  @ApiProperty({ description: 'total' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ApiProperty({ description: 'payment FK' })
  @OneToOne(() => Payment, (payment) => payment.orderDetail)
  @JoinColumn()
  payment: Payment;

  @ApiProperty({ description: 'Services FK' })
  @OneToOne(
    () => AdditionalServiceOrderDetail,
    (additionalServiceOrderDetail) => additionalServiceOrderDetail.order_detail,
    { nullable: true },
  )
  @JoinColumn()
  additionalSrviceOrderDetail?: AdditionalServiceOrderDetail;

  @ApiProperty({ description: 'user FK' })
  @ManyToOne(() => User, (user) => user.orderDetail)
  @JoinColumn()
  user: User;

  @ApiProperty({ description: 'reservation FK' })
  @OneToOne(() => Reservation, (reservation) => reservation.order_detail)
  @JoinColumn()
  reservation: Reservation;
}
