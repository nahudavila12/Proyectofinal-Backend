import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn
} from 'typeorm';

import { ServiceDetail } from '../service/serviceDetail'; 

@Entity('OrderDetailService')
export class OrderDetailService {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    total: number;

    @OneToMany(() => ServiceDetail, (serviceDetail) => serviceDetail.orderDetailService)
    serviceDetails: ServiceDetail[];
}
