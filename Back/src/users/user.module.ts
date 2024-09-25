import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; 
import { UserRepository } from './user.repository'; 


@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  controllers: [UsersController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}  