import{
    PrimaryGeneratedColumn,
    Column,
    Entity,
    ManyToOne,
    OneToOne,
    JoinColumn
}   from 'typeorm';

import { Room } from "../rooms/room.entity";
import { OrderDetail } from "../orderDetails/orderDetail.entity";
import { User } from '../users/user.entity';

enum IStateBooking {
    ACTIVE = 'active',
    PENDING = 'pending',
    CANCELLED = 'cancelled'
}

@Entity('reservatios')
export class Reservation{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    
    @Column({ type: 'enum', enum: IStateBooking, default: IStateBooking.PENDING })
    state: IStateBooking;
    
    @Column()
    checkIn: Date;
    
    @Column()
    checkOut: Date;

    @ManyToOne( () => User, (user) => user.reservation)
    @JoinColumn()
    user: User;

    @ManyToOne(() => Room, (room) => room.reservation)
    @JoinColumn()
    room: Room;

    @OneToOne(() => OrderDetail, (orderdetail) => orderdetail.reservation)
    order_detail: OrderDetail;

}