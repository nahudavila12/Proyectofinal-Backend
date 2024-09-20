import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Property } from './property.entity';
  
  @Entity('PropertiesIMG')
  export class PropertyImg {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
  
    @Column()
    img: string;
  
    @ManyToOne(() => Property, (property) => property.images)  // Asegúrate de especificar la relación
    @JoinColumn()
    property: Property;
  }
  