import { Controller, Get, HttpCode, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProfilesService } from './profile.service';

@Controller('profiles')
export class ProfilesController {
    constructor(
        private readonly profileService: ProfilesService 
    ) {}

    @Get('getProfile/:uuid')
    @HttpCode(200)
    async getProfile(
        @Param('uuid', ParseUUIDPipe) userUuid: string
    ) {
        return await this.profileService.getProfile(userUuid); 
    }
}