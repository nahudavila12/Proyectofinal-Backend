import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn
}from 'typeorm';

import { Payment } from '../payments/payment.entity';
import { OrderDetailAdditionalService } from '../orderDetails/orderDetailAdditionalService';
import { User } from '../users/user.entity';
import { Reservation } from '../reservations/reservation.entity';

@Entity('Orders_details')
export class OrderDetail{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    date: Date;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    room_total: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    additionals_services_total: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @OneToOne(() => Payment, (payment) => payment.orderDetail)
    @JoinColumn()
    payment: Payment;

    @OneToOne(
        () => OrderDetailAdditionalService, 
        (additionalServiceOrderDetail) => additionalServiceOrderDetail.order_detail,
        { nullable: true }
    )
    @JoinColumn()
    additionalSrviceOrderDetail?: OrderDetailAdditionalService;

    @ManyToOne(() => User, (user) => user.orderDetail)
    @JoinColumn()
    user: User;

    @OneToOne(() => Reservation, (reservation) => reservation.order_detail)
    @JoinColumn()
    reservation: Reservation;
}