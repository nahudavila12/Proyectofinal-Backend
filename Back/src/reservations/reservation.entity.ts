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
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { User } from 'src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

enum IStateBooking {
  ACTIVE = 'active',
  PENDING = 'pending',
  CANCELLED = 'cancelled',
}

@Entity('reservations')
export class Reservation {
  @ApiProperty({
    example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
    description: 'UUID de la reservación',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    enum: IStateBooking,
    default: IStateBooking.PENDING,
    description: 'Estado de la reservación',
  })
  @Column({ type: 'enum', enum: IStateBooking, default: IStateBooking.PENDING })
  state: IStateBooking;

  @ApiProperty({
    example: '2024-09-20T15:00:00Z',
    description: 'Fecha de check-in',
  })
  @Column({nullable: false})
  checkin: Date;

  @ApiProperty({
    example: '2024-09-25T11:00:00Z',
    description: 'Fecha de check-out',
  })
  @Column({nullable: false})
  checkout: Date;

  @ApiProperty({
  type: () => User,
  description: 'Usuario que hizo la reservación',
  })
  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn()
  user: User;

  @ApiProperty({ type: () => Room, description: 'Habitación reservada' })
  @ManyToOne(() => Room, (room) => room.reservation)
  @JoinColumn()
  room: Room;

  @ApiProperty({
    type: () => OrderDetail,
    description: 'Detalle del pedido relacionado con la reservación',
  })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.reservation)
  order_detail: OrderDetail;
}
