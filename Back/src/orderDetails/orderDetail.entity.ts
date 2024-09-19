import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn
}from 'typeorm';

import { Payment } from './payment.entity';
import { AdditionalServiceOrderDetail } from './orderDetailAdditionalService.entity';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';

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
        () => AdditionalServiceOrderDetail, 
        (additionalServiceOrderDetail) => additionalServiceOrderDetail.order_detail,
        { nullable: true }
    )
    @JoinColumn()
    additionalSrviceOrderDetail?: AdditionalServiceOrderDetail;

    @ManyToOne(() => User, (user) => user.orderDetail)
    @JoinColumn()
    user: User;

    @OneToOne(() => Reservation, (reservation) => reservation.order_detail)
    @JoinColumn()
    reservation: Reservation;
}