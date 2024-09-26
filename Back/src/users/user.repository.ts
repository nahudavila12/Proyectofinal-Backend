import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dtos/createUser.dto";
import { Profile } from "src/profiles/profile.entity";


@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ){}

    async getAllUsers(offset, limit): Promise<User[]>{

        const splitUsers = await this.userRepository.find();
        splitUsers.slice(offset, offset + limit)

        return splitUsers;
    }

    async addUser(newUser: CreateUserDto): Promise<User> | undefined{
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
    }
        
    async getUserByEmail(email: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOne({ where: { email } });
        } catch (error) {
            throw new InternalServerErrorException('Error al buscar el usuario por email en el repositorio.', error.message);
        }
    }

    async bannUser(uuid:string): Promise<Partial<User> | string>{
        const foundUser = await this.userRepository.findOneBy({uuid});
            if(!foundUser) throw new NotFoundException('Usuario no encontrado');
            if(foundUser.isActive === false) throw new NotFoundException('Usuario no encontrado');

        foundUser.isBanned = true;
        foundUser.isActive = false;

        await this.userRepository.save(foundUser);

        const { password, rol, isBanned, isActive, ...bannedUser } = foundUser;

        return bannedUser;
    }
      
    async deleteUser(uuid: string): Promise<Partial<User> | string>{
        const foundUser = await this.userRepository.findOne({where: {uuid}})
            if(!foundUser) throw new NotFoundException('usuario no encontrado');
            if(foundUser.isBanned === true) throw new ForbiddenException('Acceso denegado')

        foundUser.isActive = false;
        await this.userRepository.save(foundUser);

        const { password, isActive, isBanned, rol, ...eliminatedUser } = foundUser;

        return eliminatedUser;
    }
}
        
            

