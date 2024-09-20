import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('profile')
export class Profile {
  @ApiProperty({ description: 'Profile ID' })
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ApiProperty({ description: 'username' })
  @Column({ unique: true })
  user_name: string;

  @ApiProperty({ description: 'mail of user' })
  @Column({ unique: true })
  mail: string;

  @ApiProperty({ description: 'phonenumber of user' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'adress of user' })
  @Column()
  address: string;

  //password en el perfil?
  @ApiProperty({ description: 'password' })
  @Column()
  password: string;

  @ApiProperty({ description: 'prfile img' })
  @Column()
  userIMG: string;

  @ApiProperty({ description: 'User FK' })
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
