import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getAllUsers(){

        const listUsers = await this.userRepository.find()

        return 'listUsers';
    }
}
