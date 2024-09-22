import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, OneToMany } from 'typeorm';
import { Owner } from '../owners/owner.entity';
import { Room } from '../rooms/room.entity';
import { PropertyImg } from './propertyImg.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum PropertyType {
  HOTEL = 'hotel',
  CABANA = 'cabaña',
  DEPARTAMENTO = 'departamento',
}

@Entity('Properties')
export class Property {

  @ApiProperty({ example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4', description: 'UUID de la propiedad' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ example: 'Hotel California', description: 'Nombre de la propiedad' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: '123 Calle Principal, Ciudad', description: 'Ubicación de la propiedad' })
  @Column()
  location: string;

  @ApiProperty({ enum: PropertyType, example: PropertyType.HOTEL, description: 'Tipo de propiedad' })
  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  propertyType: PropertyType;

  @ApiProperty({ example: false, description: 'Si la propiedad está prohibida o no' })
  @Column({ default: false })
  isBanned: boolean;

  @ApiProperty({ type: () => [PropertyImg], description: 'Imágenes de la propiedad' })
  @OneToMany(() => PropertyImg, (propertyImg) => propertyImg.property)
  img: PropertyImg[];

  @ApiProperty({ type: () => Owner, description: 'Propietario de la propiedad' })
  @ManyToOne(() => Owner, (owner) => owner.property)
