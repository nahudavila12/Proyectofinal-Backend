import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from './room.entity'

export enum ICategories{
    STANDARD = 'standard',
    DELUXE = 'deluxe',
    SUITE = 'suite'
}

@Entity()
export class RoomCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: ICategories})
    name: ICategories; 

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Room, room => room.category)
    rooms: Room[];
}
