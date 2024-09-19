import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

import { Profile } from './profile.entity';
import { OrderDetail } from './orderDetail.entity';
import { Reservation } from './reservation.entity';
import { Owner } from './owner.entity';

export enum IRol {
    User = 'user',
    Admin = 'admin',
    Owner = 'owner'
}

@Entity('users')
export class User{

@PrimaryGeneratedColumn('uuid')
uuid: string;

@Column({ nullable: false })
name: string;

@Column({ nullable: false, unique: true })
email: string;

@Column({ type: 'date' })
birthday: Date;

@Column({ nullable: false })
phone: string;

@Column({ nullable: false})
address: string;

@Column({ nullable: false })
password: string;

@Column({ type: 'enum', default: IRol.User})
rol: IRol

@Column({ default: true })
isActive: boolean;

@OneToOne(() => Profile, (profile) => profile.user )
profile: Profile

@OneToOne(() => Owner, (owner) => owner.user)
owner: Owner

@OneToMany(() => OrderDetail, (orderDetail) => orderDetail.user)
orderDetail: OrderDetail[]

@OneToMany(() => Reservation, (reservation) => reservation.user)
reservation: Reservation[]


}