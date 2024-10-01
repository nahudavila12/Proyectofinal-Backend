import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { Profile } from './profile.entity';

@Injectable()
export class ProfileRepository {
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ) {}

    async save(profile: Profile): Promise<Profile> {
        return await this.profileRepository.save(profile);
    }

    async findOne(options: FindOneOptions<Profile>): Promise<Profile | undefined> {
        return await this.profileRepository.findOne(options);
    }

    async createProfile(profileData: Partial<Profile>): Promise<Profile> {
        const profile = this.profileRepository.create(profileData);  // Usa el método create de TypeORM
        return this.save(profile);
    }
}
