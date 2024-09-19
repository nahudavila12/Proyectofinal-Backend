import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm';

import { Bussines } from './property.entity';

@Entity('BussinesImg')
export class BussinesImg {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    img: string; 

    @ManyToOne(() => Bussines, (bussines) => bussines.img)
    @JoinColumn()
    hotel: Bussines;  
}