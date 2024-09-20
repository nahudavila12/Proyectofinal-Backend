import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Owner } from 'src/owners/owner.entity';
import { Room } from 'src/rooms/room.entity';
import { PropertyImg } from './propertyImg.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Properties')
export class Property {
  @ApiProperty({ description: 'Propierty ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'name of propierty' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ description: 'propierty address' })
  @Column()
  location: string;

  @ApiProperty({ description: 'propierty img' })
  @OneToMany(() => PropertyImg, (propertyImg) => propertyImg.property)
  img: PropertyImg[];

  @ApiProperty({ description: 'owner FK' })
  @ManyToOne(() => Owner, (owner) => owner.property)
  @JoinColumn()
  owner: Owner;

  @ApiProperty({ description: 'room FK' })
  @OneToMany(() => Room, (room) => room.property)
  room: Room[];
}
