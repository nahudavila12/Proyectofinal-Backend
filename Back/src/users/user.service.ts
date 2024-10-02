import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { CloudinaryService } from 'src/commons/cloudinary.service';
import { ProfileRepository } from 'src/profiles/profile.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly cloudinaryService: CloudinaryService,
        private readonly profileRepository: ProfileRepository
    ) {}

    async getAllUsers(page: number, limit: number): Promise<User[]> {
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        if (isNaN(pageNumber) || isNaN(limitNumber)) {
            throw new Error('Los valores de page y limit deben ser números');
        }

        const skip = (pageNumber - 1) * limitNumber;
        return this.userRepository.find({
            skip: skip,
            take: limitNumber,
        });
    }

    async addUser(newUser: CreateUserDto, file?: Express.Multer.File): Promise<User> {
        const existingUser = await this.userRepository.findOne({
            where: { email: newUser.email },
        });

        if (existingUser) {
            throw new ConflictException('El email ya está en uso');
        }



        try {
         
            const user = new User(); 
            Object.assign(user, newUser)
            user.firstName = newUser.firstName;  
            user.lastName = newUser.lastName;    
            user.user_name = newUser.user_name;  
            user.email = newUser.email;          
            user.password = newUser.password;    
            user.address = newUser.address;      
            user.phone = newUser.phone;          
            user.country = newUser.country;      
            user.birthday = newUser.birthday;

            const savedUser = await this.userRepository.save(user); 

            let imageUrl: string = ''; 
            if (file) {
                const uploadResult = await this.cloudinaryService.uploadImage(file);
                imageUrl = uploadResult.secure_url; 
            }

            const profile = await this.profileRepository.findOne({
                where: { user: savedUser },
            });

            if (profile) {
                profile.userIMG = imageUrl; 
                await this.profileRepository.save(profile);
            } else {
                const newProfile = await this.profileRepository.createProfile({
                    user: savedUser,
                    userIMG: imageUrl,
                    user_name: savedUser.user_name,
                    email: savedUser.email,
                    phone: savedUser.phone,
                    country: savedUser.country,
                    address: savedUser.address,
                    password: savedUser.password,
                });
                await this.profileRepository.save(newProfile);
            }

            return savedUser; 
        } catch (error) {
            throw new InternalServerErrorException(
                'Error al agregar el usuario.',
                error.message
            );
        }
    }

    async findByEmail(email: string): Promise<User | undefined> {
        try {
            return await this.userRepository.findOne({
                where: { email },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                'Error al buscar el usuario por email en el servicio.',
                error.message
            );
        }
    }

    async deleteUser(uuid: string) {
        const result = await this.userRepository.delete(uuid);
        if (result.affected === 0) {
            throw new NotFoundException('Usuario no encontrado');
        }
    }

    async bannUser(uuid: string) {
        const user = await this.userRepository.findOne({
            where: { uuid },
        });
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
        user.isBanned = true;
        await this.userRepository.save(user);
    }
}
