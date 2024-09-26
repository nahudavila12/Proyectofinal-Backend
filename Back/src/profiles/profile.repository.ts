import { Injectable } from '@nestjs/common';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";

@Injectable()
export class ProfileRepository{
    constructor(
        @InjectRepository(Profile)
        private readonly profileRepository: Repository<Profile>
    ){}
}