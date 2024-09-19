import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn
}from 'typeorm';
import { Reservation } from './reservation.entity';
import { Property } from './property.entity';
import { RoomImg } from './roomImg.entity';

export enum ICategories {
    STANDARD = 'standard',
    DELUXE = 'deluxe',
    SUITE = 'suite'
}

enum IRoomState{
    Avaiable = 'avaiable',
    Reserved = 'reserved',
    Occupied = 'occupied',
    Maintenance = 'maintenance'
}

@Entity('rooms')
export class Room{

    @PrimaryGeneratedColumn('uuid')
    uuid: number;

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

    @ManyToOne(() => Property, (property) => property.room)
    property: Property
}