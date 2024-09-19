import{
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    OneToMany
}from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ unique: true })
    user_name: string;

    @Column({ unique: true })
    mail: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column()
    password: string;

    @Column()
    userIMG: string;

    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn()
    user: User;
}