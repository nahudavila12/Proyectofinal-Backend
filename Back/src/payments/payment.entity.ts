import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { OrderDetail } from 'src/orderDetails/orderDetail.entity';
import { ApiProperty } from '@nestjs/swagger';

enum IState {
  Pending = 'pending',
  Successful = 'successful',
  Refused = 'refused',
}

@Entity('Payments')
export class Payment {
  @ApiProperty({ description: 'Payment ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'date of payment' })
  @Column()
  date: Date;

  @ApiProperty({ description: 'State of the payment' })
  @Column({ type: 'enum', enum: IState, default: IState.Pending })
  state: IState;

  @ApiProperty({ description: 'method of payment' })
  @Column()
  method: string;

  @ApiProperty({ description: 'order detail FK' })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.payment)
  @JoinColumn()
  orderDetail: OrderDetail;
}
