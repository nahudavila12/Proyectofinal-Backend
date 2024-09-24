import { 
  Entity, 
  PrimaryColumn, 
  Column, 
  ManyToOne,
  JoinColumn 
} from 'typeorm';

import { OrderDetailAdditionalService } from './orderDetailAdditionalService.entity';

@Entity('AdditionalsServices')
export class AdditionalService {
  @PrimaryColumn()
  id: number;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_person: number;

  @ManyToOne(
     () => OrderDetailAdditionalService,
     (orderDetailAdditionalService) =>
       orderDetailAdditionalService.additionalService,
   )
  @JoinColumn()
  orderDetailAdditionalService: OrderDetailAdditionalService;
}