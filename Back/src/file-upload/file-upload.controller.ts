import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    Param,
    UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/guards/roles.decorator';
import { IRol } from 'src/users/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}




    @ApiOperation({ summary: 'Upload a room image' })
    @ApiResponse({ status: 200, description: 'Room image uploaded successfully' })
    @Post('upload-room-image/:id') 
    @UseGuards(AuthGuard, RolesGuard) 
    @Roles(IRol.User, IRol.Admin) 
    @UseInterceptors(FileInterceptor('file'))
    async uploadRoomImage(
        @Param('id') id: string, 
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 20 * 1024 * 1024, 
                        message: 'El archivo debe ser menor a 20MB',
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.fileUploadService.uploadRoomImage(id, file); 
    }
    

    @ApiOperation({ summary: 'Upload a property image' })
    @ApiResponse({ status: 200, description: 'Property image uploaded successfully' })
    @Post('upload-property-image/:id')
    @UseGuards(AuthGuard, RolesGuard) 
    @Roles(IRol.Owner, IRol.Admin)
    @UseInterceptors(FileInterceptor('file'))
    async uploadPropertyImage(
        @Param('id') id: string,  
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 20 * 1024 * 1024, // 20MB
                        message: 'El archivo debe ser menor a 20MB',
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.fileUploadService.uploadPropertyImage(id, file);  
    }

    @ApiOperation({ summary: 'Upload a user profile image' })
    @ApiResponse({ status: 200, description: 'User profile image uploaded successfully' })
    @Post('upload-user-image/:id')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(IRol.User) // Solo usuarios normales pueden subir su imagen de perfil
    @UseInterceptors(FileInterceptor('file'))
    async uploadUserImage(
        @Param('id') id: string,  
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 10 * 1024 * 1024, // 10MB
                        message: 'El archivo debe ser menor a 10MB',
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webp)$/,
                    }),
                ],
            }),
        )
        file: Express.Multer.File,
    ) {
        return this.fileUploadService.uploadUserImage(id, file);  
    }
    
}
