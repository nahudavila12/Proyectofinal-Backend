import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Payment } from '../payments/payment.entity';
import { OrderDetailAdditionalService } from '../additionalsServices/orderDetailAdditionalService.entity';
import { User } from '../users/user.entity';
import { Reservation } from '../reservations/reservation.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Orders_details')
export class OrderDetail {
  @ApiProperty({
    example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
    description: 'UUID del detalle del pedido',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    example: '2024-09-20T15:00:00Z',
    description: 'Fecha de la orden',
  })
  @Column()
  date: Date; 

  @ApiProperty({
    example: 150.0,
    description: 'Total del costo de la habitación',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  room_total: number;

  @ApiProperty({
    example: 50.0,
    description: 'Total de los servicios adicionales (opcional)',
    nullable: true,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  additionals_services_total: number;

  @ApiProperty({ example: 200.0, description: 'Total del pedido' })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @ApiProperty({
    type: () => Payment,
    description: 'Pago asociado al detalle del pedido',
  })
  @OneToOne(() => Payment, (payment) => payment.orderDetail)
  @JoinColumn()
  payment: Payment;

  @ApiProperty({
    type: () => OrderDetailAdditionalService,
    description: 'Detalles de los servicios adicionales de la orden (opcional)',
    nullable: true,
  })
  @OneToOne(
    () => OrderDetailAdditionalService,
    (additionalServiceOrderDetail) => additionalServiceOrderDetail.orderDetail,
    { nullable: true},
  )
  @JoinColumn()
  additionalServiceOrderDetail?: OrderDetailAdditionalService; 

  @ApiProperty({
    type: () => User,
    description: 'Usuario asociado con el detalle del pedido',
  })
  @ManyToOne(() => User, (user) => user.orderDetail)
  @JoinColumn()
  user: User;

  @ApiProperty({
    type: () => Reservation,
    description: 'Reservación asociada con el detalle del pedido',
  })
  @OneToOne(() => Reservation, (reservation) => reservation.order_detail)
  @JoinColumn()
  reservation: Reservation;
}

