import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
}from 'typeorm';
import { Room } from './room.entity';

@Entity('RoomsImg')
export class RoomImg{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    img: string;

    @ManyToOne(() => Room)
    @JoinColumn()
    room: Room
}