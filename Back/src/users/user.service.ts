import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { CloudinaryService } from 'src/commons/cloudinary.service';
import { ProfileRepository } from 'src/profiles/profile.repository';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
        private readonly cloudinaryService: CloudinaryService,
        private readonly profileRepository: ProfileRepository
    ) {}

    async getAllUsers(page: number, limit: number): Promise<User[]> {
        return this.userRepository.getAllUsers(page, limit)
    }

    async addUser(newUser: CreateUserDto): Promise<User | null> {
        return this.userRepository.addUser(newUser); 
    } 
        
    async findByEmail(email: string): Promise<User | undefined> {
       return this.userRepository.findByEmail(email)
    }

    // Nuevo método para actualizar la imagen del perfil
    async updateUserProfileImage(userUuid: string, userImageUrl: string): Promise<void> {
        const profile = await this.profileRepository.findOne({
            where: { user: { uuid: userUuid } },
        });

        if (!profile) {
            throw new NotFoundException('Perfil no encontrado para el usuario.');
        }

        profile.userIMG = userImageUrl;
        await this.profileRepository.save(profile);
    }

    async deleteUser(uuid: string): Promise<void> {
        await this.userRepository.deleteUser(uuid);
    }
    

    async bannUser(uuid: string): Promise<void> {
        return this.userRepository.bannUser(uuid); 
    }
    
}
