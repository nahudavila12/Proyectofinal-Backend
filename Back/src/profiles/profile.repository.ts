import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class ProfileDto {
  user_name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  userIMG: string;
}

@Injectable()
export class ProfileRepository  {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getProfile(userUuid: string): Promise<ProfileDto | null>{

    const foundProfile = await this.profileRepository.findOne({
      where: { user: { uuid: userUuid } }, 
      relations: ['user'],       
    });
      if(!foundProfile) throw new NotFoundException('Perfil de usuario no encontrado')
    
    const { user_name, email, phone,country,address,password,userIMG } = foundProfile;
    
    return {user_name, email, phone,country,address,password,userIMG} as ProfileDto
  }
}
