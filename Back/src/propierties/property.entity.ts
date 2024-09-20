import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  
  import { Owner } from '../owners/owner.entity';
  import { Room } from '../rooms/room.entity';
  import { PropertyImg } from './propertyImg.entity';
  
  export enum PropertyType {
    HOTEL = 'hotel',
    CABANA = 'cabaña',
    DEPARTAMENTO = 'departamento',
  }


  @Entity('Properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ nullable: false })
    name: string;

    @Column()
    location: string;

    @Column({
      type: 'enum',
      enum: PropertyType,
    })
    propertyType: PropertyType;

    @Column({ default: false }) 
    isBanned: boolean; 

    @OneToMany(() => PropertyImg, (propertyImg) => propertyImg.property)
    img: PropertyImg[];

    @ManyToOne(() => Owner, (owner) => owner.property)
    @JoinColumn()
    owner: Owner;

    @OneToMany(() => Room, (room) => room.property)
    room: Room[];
}
