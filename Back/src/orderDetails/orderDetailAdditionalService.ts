import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { AdditionalService } from '../Entities/additionalService.entity';
import { OrderDetail } from './orderDetail.entity';

@Entity('Additionals_Services_Order_Detail')
export class OrderDetailAdditionalService {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @OneToMany(
    () => AdditionalService,
    (additionalsServices) => additionalsServices.orderDetailAdditionalService,
  )
  additionalService: AdditionalService;

  @OneToOne(
    () => OrderDetail,
    (orderDetail) => orderDetail.additionalSrviceOrderDetail,
  )
  @JoinColumn()
  order_detail: OrderDetail;
}
