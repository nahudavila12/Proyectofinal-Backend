import { Controller, Get, HttpCode, Param, ParseUUIDPipe, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profile.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/decorators/multerOptions';

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

    @Put('changeProfileImg/:uuid')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async profileImgUploadImage(
        @Param('uuid', ParseUUIDPipe) profileUuid: string,
        @UploadedFile() file: Express.Multer.File
    ) {
        return await this.profileService.profileImgUploadImage(profileUuid,file)
    }
    
}