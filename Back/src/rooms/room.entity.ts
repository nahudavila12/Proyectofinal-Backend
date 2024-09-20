import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
}from 'typeorm';
import { Reservation } from '../reservations/reservation.entity'
import { Property } from '../propierties/property.entity';
import { RoomImg } from './roomImg.entity';
import { RoomService } from './roomService.entity';

export enum ICategories {
    STANDARD = 'standard',
    DELUXE = 'deluxe',
    SUITE = 'suite',
}

export enum IRoomState{
    Avaiable = 'avaiable',
    Reserved = 'reserved',
    Occupied = 'occupied',
    Maintenance = 'maintenance'
}

@Entity('rooms')
export class Room{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    room_number: number; 

    @Column({type: 'enum', enum: ICategories })
    category: ICategories;

    @Column()
    capacity: number;

    @Column()
    price_per_day: number

    @Column({ type: 'enum', enum: IRoomState, default: IRoomState.Avaiable })
    disponibility: IRoomState

    @OneToMany(() => RoomImg, (roomImg) => roomImg.room)
    img: RoomImg[];

    @OneToMany(() => Reservation, (reservation) => reservation.room)
    reservation: Reservation[]
    
    @OneToMany(() => RoomService, (roomService) => roomService.room)
    services: RoomService[];

    @ManyToOne(() => Property, (property) => property.room)
    property: Property
}