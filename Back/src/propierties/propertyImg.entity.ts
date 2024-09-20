import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('PropertiesIMG')
export class PropertyImg {
  @ApiProperty({ description: 'img ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'claudinary link to img' })
  @Column()
  img: string;

  @ApiProperty({ description: 'propierty FK' })
  @ManyToOne(() => Property)
  @JoinColumn()
  property: Property;
}
