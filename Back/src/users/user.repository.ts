import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { Profile } from "src/profiles/profile.entity";
import { json } from "stream/consumers";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ){}

    async getAllUsers(offset, limit){

        const splitUsers = await this.userRepository.find();
        splitUsers.slice(offset, offset + limit)

        return splitUsers;
    }

    async addUser(newUser: CreateUserDto): Promise<User>{
        try{
            const { email } = newUser;

            const checkMail = await this.userRepository.findOne({ where: {email}})
                if (checkMail) throw new ConflictException('El email ya esta en uso');
        
            const addUser = await this.userRepository.create(newUser)
                await this.userRepository.save(addUser);
        
            const profileUser: Profile = new Profile
            profileUser.user_name = addUser.name
            profileUser.mail = addUser.email
            profileUser.password = addUser.password
            profileUser.phone = addUser.phone
            profileUser.address = addUser.address
            profileUser.country = addUser.country
            profileUser.user = addUser
                await this.profileRepository.save(profileUser)
            
            return addUser;
        
        }catch(error){
            throw new InternalServerErrorException('Error en el servidor')
        }

        
    }
    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el usuario por email en el repositorio.', error.message);
        }
    }

    async deleteUser(uuid: string): Promise<string>{
        try{
            const foundUser = await this.userRepository.findOne({where: {uuid}})
                if (!foundUser) throw new NotFoundException('usuario no encontrado');

                foundUser.isActive = false;

                await this.userRepository.save(foundUser);
            
            return 'Usuario eliminado con éxito';
        
        }catch(err){
            throw new InternalServerErrorException('Error en el servidor')
        }
    }
}

