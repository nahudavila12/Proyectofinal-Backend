import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne
} from 'typeorm'; 

import { OrderDetailService } from './OrderDetailService'; 

@Entity('ServiceDetail')
export class ServiceDetail {

    @PrimaryGeneratedColumn() 
    id: number;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    pricePerPerson: number; 

    @ManyToOne(() => OrderDetailService, (orderDetail) => orderDetail.serviceDetails)
    orderDetailService: OrderDetailService; 
}
