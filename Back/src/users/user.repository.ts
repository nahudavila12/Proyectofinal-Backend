import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/createUser.dto";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getAllUsers(offset, limit){

        const splitUsers = await this.userRepository.find();
        splitUsers.slice(offset, offset + limit)

        return splitUsers;
    }

    async addUser(newUser: CreateUserDto): Promise<User>{

        const { email } = newUser;

        const checkMail = await this.userRepository.findOne({ where: {email}})
            if (checkMail) throw new ConflictException('El email ya esta en uso');
        
        const addUser = await this.userRepository.create(newUser)
            await this.userRepository.save(addUser);
        
        return addUser;
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el usuario por email en el repositorio.', error.message);
        }
    }
}

