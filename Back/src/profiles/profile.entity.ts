import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
}from 'typeorm';
import { User } from '../users/user.entity';

@Entity('profile')
export class Profile{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ unique: true })
    user_name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column()
    country: string

    @Column()
    address: string;

    @Column()
    password: string;

    @Column({ nullable: true})
    userIMG: string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn()
    user: User;
}