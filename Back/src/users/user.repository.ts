import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from '../profiles/profile.entity';  // Asegúrate de importar tu entidad Profile
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        
        @InjectRepository(Profile)  // Asegúrate de inyectar el repositorio de Profile
        private readonly profileRepository: Repository<Profile>
    ) {}

    async getAllUsers(offset: number, limit: number): Promise<User[]> {
        const users = await this.userRepository.find({
            skip: offset,
            take: limit,
        });
        return users;
    }

    async createUser(newUser: CreateUserDto, imageUrl: string): Promise<User> {
        const user = this.userRepository.create(newUser);  
        const savedUser = await this.userRepository.save(user);  
        
        const profile = this.profileRepository.create({
            user: savedUser,
            userIMG: imageUrl,  // Asigna la URL de Cloudinary
        });
        await this.profileRepository.save(profile);  

        return savedUser;  
    }

    async findOne(conditions: any): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: conditions });
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async deleteUser(uuid: string): Promise<void> {
        await this.userRepository.delete({ uuid });
    }

    async bannUser(uuid: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { uuid } });
        if (user) {
            user.isBanned = true;
            user.isActive = false;
            await this.userRepository.save(user);
        }
    }
}
