import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    OneToMany,
    OneToOne
}from 'typeorm'

import { User } from './user.entity';
import { Property } from './property.entity';


@Entity('Owners')
export class Owner{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ nullable: false })
    bussines_name: string;

    @OneToOne(() => User, (user) => user.owner)
    @JoinColumn()
    user: User

    @OneToMany(() => Property, (property) => property.owner)
    @JoinColumn()
    property: Property[]
}