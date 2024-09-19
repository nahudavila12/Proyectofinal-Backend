import{
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    JoinColumn,
    OneToMany
}from 'typeorm';

import { Owner } from './owner.entity';
import { Room } from './room.entity';
import { PropertyImg } from './propertyImg.entity';


@Entity('Properties')
export class Property{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ nullable: false })
    name: string

    @Column()
    location: string;

    @OneToMany(()=> PropertyImg, (propertyImg) => propertyImg.property)
    img: PropertyImg[]

    @ManyToOne(() => Owner, (owner) => owner.property)
    @JoinColumn()
    owner: Owner

    @OneToMany(() => Room, (room) => room.property)
    room: Room[]

}