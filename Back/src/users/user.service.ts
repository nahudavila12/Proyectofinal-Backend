import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    getAllUsers(page: number, limit: number){

        const offset = (page -  1)* limit;

        return this.userRepository.getAllUsers(offset, limit)
    }

    addUser(newUser: CreateUserDto){
        return this.userRepository.addUser(newUser)
    }
}
