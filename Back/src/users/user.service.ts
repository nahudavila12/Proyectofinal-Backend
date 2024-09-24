import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    getAllUsers(){
        return this.userRepository.getAllUsers()
    }
}
