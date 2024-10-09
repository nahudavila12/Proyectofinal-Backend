import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from '../orderDetail/orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from 'src/reservations/reservation.entity';
import { User } from 'src/users/user.entity';


@Entity('Payments')
export class Payment {
  @ApiProperty({
    example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
    description: 'UUID del pago',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  
  @ApiProperty({ example: '2024-05-08', description: 'fecha en la que se realizó el pago' })
  @Column()
  date: Date;

  @ApiProperty({ example: 'ID:34323', description: 'ID de la orden de pago generada por paypal' })
  @Column({nullable: true})
  orderId: string;

  @ApiProperty({ example: 'USD', description: 'Moneda en la cual se hizo el pago' })
  @ApiProperty({
    example: '2024-09-20T15:00:00Z',
    description: 'Fecha del pago',
  })
  @Column({nullable: true})
  currency: string;

  @ApiProperty({ example: 'locolindo@paypal.com', description: 'Email de la cuenta con la que se realizó el pago' })
  @Column({nullable: true})
  payerEmail: string;

  @ApiProperty({ example: 'locolindo@paypal.com', description: 'Id de la cuenta con la que el pagador realizó el pago' })
  @Column({nullable: true})
  payerId: string

  @ApiProperty({
    example: 'pending',
    description: 'Estado del pago',
  })
  @Column( {default:'pendding'} )
  status: string;

  @ApiProperty({
    example: 100.00,
    description: 'Total del pago realizado',
})
  @Column('decimal', { precision: 10, scale: 2 })

  total: number;

  @ApiProperty({
    type: () => OrderDetail,
    description: 'Detalle del pedido relacionado con el pago',
  })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.payment)
  orderDetail: OrderDetail;

  @OneToOne(()=> Reservation, (reservation) => reservation.payment)
  @JoinColumn()
  reservation: Reservation

  @OneToOne(()=> User, (user)=> user.payment)
  @JoinColumn()
  user: User
}
