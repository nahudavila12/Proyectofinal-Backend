import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

import { User } from 'src/users/user.entity';}
import { Property } from 'src/propierties/property.entity';}
import { ApiProperty } from '@nestjs/swagger';

@Entity('Owners')
export class Owner {
  @ApiProperty({ description: 'Owner ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'Bussiness name of the owner' })
  @Column({ nullable: false })
  bussines_name: string;

  @ApiProperty({ description: 'user of the owner' })
  @OneToOne(() => User, (user) => user.owner)
  @JoinColumn()
  user: User;

  @ApiProperty({ description: 'List of propierties owned' })
  @OneToMany(() => Property, (property) => property.owner)
  @JoinColumn()
  property: Property[];
}
