import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";


@Entity('room_services')
export class RoomService {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    serviceName: string;

    @ManyToOne(() => Room, (room) => room.services)
    room: Room;
}
