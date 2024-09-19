import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
}from 'typeorm';

import { OrderDetail } from './OrderDetail.entity';

enum IState {
    Pending = 'pending',
    Successful = 'successful',
    Refused = 'refused'
}

@Entity('Payments')
export class Payment {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    date: Date;

    @Column({ type: 'enum', enum: IState, default: IState.Pending })
    state: IState;

    @Column()
    method: string;

    @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.payment)
    @JoinColumn()
    orderDetail: OrderDetail;
}