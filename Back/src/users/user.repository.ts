import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Profile } from '../profiles/profile.entity';  
import { CreateUserDto } from 'src/dtos/createUser.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Profile)  
        private readonly profileRepository: Repository<Profile>
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


    async addUser(newUser: CreateUserDto): Promise<User | null> {
        const existingUser = await this.userRepository.findOne({
            where: { email: newUser.email },
        });

        if (existingUser) {
            throw new ConflictException('El email ya está en uso');
        }

        try {
            const user = new User(); 
            Object.assign(user, newUser)

            const savedUser = await this.userRepository.save(user); 

            const newProfile = await this.profileRepository.create({
                user: savedUser,
                user_name: savedUser.user_name,
                email: savedUser.email,
                phone: savedUser.phone,
                country: savedUser.country,
                address: savedUser.address,
                password: savedUser.password,
            });
                await this.profileRepository.save(newProfile);
            
            return savedUser; 
            
        } catch (error) {
            throw new InternalServerErrorException(
                'Error al agregar el usuario.',
                error.message
            );
        }
    }

    async findOne(conditions: any): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: conditions });
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

    async deleteUser(uuid: string): Promise<void | null> {
        try {
            const result = await this.userRepository.delete(uuid);
            if (result.affected === 0) {
                throw new NotFoundException('Usuario no encontrado');
            }
        } catch (error) {
            throw new InternalServerErrorException('Error al eliminar el usuario.', error.message);
        }
    }
    async bannUser(uuid: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { uuid } });
            if (!user) throw new NotFoundException('Usuario no encontrado')

            user.isBanned = true;
            user.isActive = false;
            await this.userRepository.save(user);
        }
    }

