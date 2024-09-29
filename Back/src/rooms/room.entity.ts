import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Reservation } from '../reservations/reservation.entity';
import { Property } from '../properties/property.entity';
import { RoomImg } from './roomImg.entity';
import { ApiProperty } from '@nestjs/swagger';
import { RoomCategory } from './roomCategory.entity';
import { RoomService } from './roomService.entity'

export enum IRoomState {
  Avaiable = 'avaiable',
  Reserved = 'reserved',
  Occupied = 'occupied',
  Maintenance = 'maintenance',
}

@Entity('rooms')
export class Room {
  @ApiProperty({
    example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
    description: 'UUID de la habitación',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ example: 101, description: 'Número de la habitación' })
  @Column()
  room_number: number;

  @ApiProperty({
    example: 'STANDARD',
    description: 'Categoría de la habitación',
  })
  @ManyToOne(() => RoomCategory, { nullable: true })
  category: RoomCategory;
    
  @ApiProperty({ example: 2, description: 'Capacidad de la habitación' })
  @Column()
  capacity: number;

  @ApiProperty({ example: 150.0, description: 'Precio por día en USD' })
  @Column()
  price_per_day: number;

  @ApiProperty({
    enum: IRoomState,
    default: IRoomState.Avaiable,
    description: 'Estado de disponibilidad de la habitación',
  })
  @Column({ type: 'enum', enum: IRoomState, default: IRoomState.Avaiable })
  disponibility: IRoomState;

  @ApiProperty({
    type: () => [RoomImg],
    description: 'Imágenes de la habitación',
  })
  @OneToMany(() => RoomImg, (roomImg) => roomImg.room)
  img: RoomImg[];

  @ApiProperty({
    type: () => [Reservation],
    description: 'Reservaciones de la habitación',
  })
  @OneToMany(() => Reservation, (reservation) => reservation.room)
  reservation: Reservation[];

  @ApiProperty({
    type: () => Property,
    description: 'Propiedad a la que pertenece la habitación',
  })
  @ManyToOne(() => Property, (property) => property.room)
  property: Property;

  @OneToMany(() => RoomService, (roomService) => roomService.room)
  roomServices?: RoomService;
}
