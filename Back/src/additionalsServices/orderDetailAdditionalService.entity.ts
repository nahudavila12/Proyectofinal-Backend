import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import { AdditionalService } from './additionalService.entity';
import { OrderDetail } from '../orderDetail/orderDetail.entity';

@Entity('AdditionalsServicesOrderDetail')
export class OrderDetailAdditionalService {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @OneToMany(
    () => AdditionalService,
    (additionalsServices) => additionalsServices.orderDetailAdditionalService,
  )
  additionalService: AdditionalService[];

  @OneToOne(
    () => OrderDetail,
    (orderDetail) => orderDetail.additionalServiceOrderDetail,
  )
  @JoinColumn()
  orderDetail: OrderDetail;
}
