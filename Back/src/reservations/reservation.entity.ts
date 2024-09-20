import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Room } from 'src/rooms/room.entity';
import { OrderDetail } from 'src/orderDetails/orderDetail.entity';
import { User } from 'src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

enum IStateBooking {
  ACTIVE = 'active',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

@Entity('reservatios')
export class Reservation {
  @ApiProperty({ description: 'Reservaion ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'State of reservation' })
  @Column({ type: 'enum', enum: IStateBooking, default: IStateBooking.PENDING })
  state: IStateBooking;

  @ApiProperty({ description: 'date of checkin' })
  @Column()
  checkIn: Date;

  @ApiProperty({ description: 'date of checkout' })
  @Column()
  checkOut: Date;

  @ApiProperty({ description: 'User FK' })
  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn()
  user: User;

  @ApiProperty({ description: 'Room FK' })
  @ManyToOne(() => Room, (room) => room.reservation)
  @JoinColumn()
  room: Room;

  @ApiProperty({ description: 'order detail FK' })
  @OneToOne(() => OrderDetail, (orderdetail) => orderdetail.reservation)
  order_detail: OrderDetail;
}
