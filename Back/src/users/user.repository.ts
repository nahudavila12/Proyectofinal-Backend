import { ConflictException, Injectable } from "@nestjs/common";
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

    async getAllUsers(){

        return await this.userRepository.find()
    }

    async addUser(newUser: CreateUserDto): Promise<User | string>{

        const { email } = newUser;

        const checkMail = await this.userRepository.findOne({ where: {email}})
            if (checkMail) throw new ConflictException('El email ya esta en uso');
        
        const addUser = await this.userRepository.create(newUser)
            await this.userRepository.save(addUser);
        
        return addUser;
    }
}

