import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Property } from 'src/propierties/property.entity';

@Entity('BussinesImg')
export class BussinesImg {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  img: string;

  @ManyToOne(() => Property, (property) => property.img)
  @JoinColumn()
  hotel: Property;
}
