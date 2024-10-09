import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


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

}
