import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';
import { OrderDetail } from '../orderDetail/orderDetail.entity';
import { Reservation } from '../reservations/reservation.entity';
import { Owner } from '../owners/owner.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Orders } from 'src/orderDetail/order.entity';

export enum IRol {
  User = 'user',
  Admin = 'admin',
  Owner = 'owner',
}

@Entity('users')
export class User {
  @ApiProperty({
    example: 'e5bdda8e-3da4-4a5f-b9ea-6239c73222f4',
    description: 'UUID del usuario',
  })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;
  @ApiProperty({ example: 'John', description: 'Nombre de pila del usuario' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Apellido del usuario'})
  @Column()
  lastName: string;

  @ApiProperty({ example: 'John_Doe12', description: 'Nombre del usuario' })
  @Column({ nullable: false, unique: true })
  user_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email del usuario',
    uniqueItems: true,
  })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({
    example: '1990-01-01',
    description: 'Fecha de nacimiento del usuario',
    type: 'string',
    format: 'date',
  })
  @Column({ type: 'date' })
  birthday: Date;

  @ApiProperty({ example: '+1234567890', description: 'Teléfono del usuario' })
  @Column({ nullable: false })
  phone: string;

  @ApiProperty({ example: '123 Main St', description: 'Dirección del usuario' })
  @Column({ nullable: false })
  address: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })  
  country: string;

  @ApiProperty({
    enum: IRol,
    default: IRol.User,
    description: 'Rol del usuario',
  })
  @Column({ type: 'enum', enum: IRol, default: IRol.User })
  rol: IRol;

  @ApiProperty({ example: true, description: 'Si el usuario está activo' })
  @Column({ default: true })
  isActive: boolean;

  
  @Column({default:false})
  isBanned: boolean
  
  @ApiProperty({
    type: () => Owner,
    description: 'Propietario relacionado al usuario',
  })
  @OneToOne(() => Owner, (owner) => owner.user, {eager:false})
  owner: Owner;
  
  @ApiProperty({ type: () => Profile, description: 'Perfil del usuario' })
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
  @ApiProperty({
    type: () => [OrderDetail],
    description: 'Detalles de órdenes del usuario',
  })
  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.user)
  orderDetail: OrderDetail[];

<<<<<<< HEAD
  @OneToMany(()=> Reservation, (reservations) => reservations.user)
  reservation: Reservation[]
=======
  @ApiProperty({
    type: () => [Reservation],
    description: 'Reservas del usuario',
  })
  @OneToMany(() => Reservation, (reservation) => reservation.user)
  @JoinColumn()
  reservation: Reservation[];


>>>>>>> c5d3039ebf8bf6377899f6edca659ccd95a51f4e
}

  
  
