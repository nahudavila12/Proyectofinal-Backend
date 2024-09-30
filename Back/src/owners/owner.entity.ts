import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Property } from '../properties/property.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Owners')
export class Owner {
  @ApiProperty({
    example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
    description: 'UUID del propietario',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({
    example: 'Mi Empresa SA',
    description: 'Nombre del negocio del propietario',
  })
  @Column({ nullable: false })
  bussines_name: string;

  @ApiProperty({
    example: '5-5421654-0',
    description: 'Numero de identificación del negocio',
  })
  @Column({unique: true, nullable: false})
  bussinesId: string;

  @ApiProperty({
    example: '54-4546545435',
    description: 'Numero telefonico del negocio',
  })
  @Column({nullable: false})
  phone: string;

  @ApiProperty({
    example: 'COMPANI@MAIL.COM',
    description: 'MAIL del negocio del propietario',
  })
  @Column()
  email: string;
  
  @ApiProperty({
    type: () => User,
    description: 'Usuario asociado con el propietario',
  })
  @OneToOne(() => User, (user) => user.owner, { eager: true })
  @JoinColumn()
  user: User;

  @ApiProperty({
    type: () => [Property],
    description: 'Propiedades gestionadas por el propietario',
  })
  @OneToMany(() => Property, (property) => property.owner)
  @JoinColumn()
  property: Property[];
}
