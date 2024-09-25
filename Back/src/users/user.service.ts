import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ){}

    getAllUsers(){
        return this.userRepository.getAllUsers()
    }

    addUser(newUser: CreateUserDto): Promise<User>{
        return this.userRepository.addUser(newUser)
    }
    
    async findByEmail(email: string): Promise<User | undefined> {
        try {
            return await this.userRepository.getUserByEmail(email);
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el usuario por email en el servicio.', error.message);
        }
    }

}
