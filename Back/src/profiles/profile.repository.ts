import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(
    @InjectRepository(Profile)
    private readonly repository: Repository<Profile>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
