import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    getAllUsers(){
        return this.userRepository.getAllUsers()
    }

    addUser(newUser: CreateUserDto){
        return this.userRepository.addUser(newUser)
    }
}
