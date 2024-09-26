import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileRepository } from './profile.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Profile]),
    ],
    providers: [ProfileRepository],
    exports: [ProfileRepository], 
})
export class ProfileModule {}