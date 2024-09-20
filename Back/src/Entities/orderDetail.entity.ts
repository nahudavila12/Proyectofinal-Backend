import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    ManyToOne,
    JoinColumn
}from 'typeorm';

<<<<<<< HEAD:Back/src/Entities/orderDetail.entity.ts
import { Payment } from './payment.entity';
import { OrderDetailAdditionalService } from './orderDetailAdditionalService';
import { User } from './user.entity';
import { Reservation } from './reservation.entity';
=======
import { Payment } from '../payments/payment.entity';
import { User } from '../users/user.entity';
import { Reservation } from '../reservations/reservation.entity';
>>>>>>> 2a953aa (fixed merges y coneccion a la base de datos):Back/src/orderDetails/orderDetail.entity.ts

@Entity('OrdersDetails')
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

<<<<<<< HEAD:Back/src/Entities/orderDetail.entity.ts
    @OneToOne(
        () => OrderDetailAdditionalService, 
        (orderDetailAdditionalService) => orderDetailAdditionalService.orderdetail,
        { nullable: true }
    )
    @JoinColumn()
    orderDetailAdditionalService?: OrderDetailAdditionalService;

=======
>>>>>>> 2a953aa (fixed merges y coneccion a la base de datos):Back/src/orderDetails/orderDetail.entity.ts
    @ManyToOne(() => User, (user) => user.orderDetail)
    @JoinColumn()
    user: User;

    @OneToOne(() => Reservation, (reservation) => reservation.order_detail)
    @JoinColumn()
    reservation: Reservation;

}