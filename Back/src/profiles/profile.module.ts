import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';
import { ProfilesService } from './profile.service';
import { ProfilesController } from './profile.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile]),
    ],
    providers: [ProfileRepository, ProfilesService],
    exports: [ProfileRepository],
    controllers: [ProfilesController], 
})
export class ProfileModule {}