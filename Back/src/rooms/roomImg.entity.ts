import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Room } from './room.entity';

@Entity('RoomImages')
export class RoomImg {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    img: string; 

    @ManyToOne(() => Room, (room) => room.roomImages)
    @JoinColumn()
    room: Room; 
}
