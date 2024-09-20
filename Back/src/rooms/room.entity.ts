import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from 'src/reservations/reservation.entity';
import { Property } from 'src/propierties/property.entity';
import { RoomImg } from './roomImg.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum ICategories {
  STANDARD = 'standard',
  DELUXE = 'deluxe',
  SUITE = 'suite',
}

enum IRoomState {
  Avaiable = 'avaiable',
  Reserved = 'reserved',
  Occupied = 'occupied',
  Maintenance = 'maintenance',
}

@Entity('rooms')
export class Room {
  @ApiProperty({ description: 'room ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Room number' })
  @Column()
  room_number: number;

  @ApiProperty({ description: 'Room category' })
  @Column({ type: 'enum', enum: ICategories })
  category: ICategories;

  @ApiProperty({ description: 'room capacity' })
  @Column()
  capacity: number;

  @ApiProperty({ description: 'price per day' })
  @Column()
  price_per_day: number;

  @ApiProperty({ description: 'availability of room' })
  @Column({ type: 'enum', enum: IRoomState, default: IRoomState.Avaiable })
  disponibility: IRoomState;

  @ApiProperty({ description: 'img' })
  @OneToMany(() => RoomImg, (roomImg) => roomImg.room)
  img: RoomImg[];

  @ApiProperty({ description: 'reservation FK' })
  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservation: Reservation[];

  @ApiProperty({ description: 'property FK' })
  @ManyToOne(() => Property, (property) => property.room)
  property: Property;
}
