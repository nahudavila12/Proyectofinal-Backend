import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { Profile } from './profile.entity';

@Injectable()
export class ProfilesService {
    constructor(
        private readonly profileRepository: ProfileRepository
    ){}

async  getProfile(userUuid: string){
    return await this.profileRepository.getProfile(userUuid)
}

async profileImgUploadImage(profileUuid, file){
    return await this.profileRepository.profileImgUploadImage(profileUuid, file)
}
}
