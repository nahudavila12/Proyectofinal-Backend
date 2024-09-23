import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { OrderDetail } from '../orderDetails/orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum IState {
  Pending = 'pending',
  Successful = 'successful',
  Refused = 'refused',
}

@Entity('Payments')
export class Payment {
  @ApiProperty({
    example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
    description: 'UUID del pago',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    example: '2024-09-20T15:00:00Z',
    description: 'Fecha del pago',
  })
  @Column()
  date: Date;

  @ApiProperty({
    enum: IState,
    example: IState.Pending,
    description: 'Estado del pago',
  })
  @Column({ type: 'enum', enum: IState, default: IState.Pending })
  state: IState;

  @ApiProperty({
    example: 'credit card',
    description: 'Método de pago utilizado',
  })
  @Column()
  method: string;

  @ApiProperty({
    type: () => OrderDetail,
    description: 'Detalle del pedido relacionado con el pago',
  })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.payment)
  @JoinColumn()
  orderDetail: OrderDetail;
}
