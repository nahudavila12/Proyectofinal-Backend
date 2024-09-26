import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    ParseFilePipe,
    MaxFileSizeValidator,
    FileTypeValidator,
    Param
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('file-upload')
@Controller('file-upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @ApiOperation({ summary: 'Upload a room image' })
    @ApiResponse({ status: 200, description: 'Room image uploaded successfully' })
    @Post('upload-room-image/:id')  // Modificado para aceptar ID
    @UseInterceptors(FileInterceptor('file'))
    async uploadRoomImage(
        @Param('id') id: string,  // Aceptar el ID como parámetro
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
        return this.fileUploadService.uploadRoomImage(id, file);  // Pasar el ID al servicio
    }

    @ApiOperation({ summary: 'Upload a property image' })
    @ApiResponse({ status: 200, description: 'Property image uploaded successfully' })
    @Post('upload-property-image/:id')  // Modificado para aceptar ID
    @UseInterceptors(FileInterceptor('file'))
    async uploadPropertyImage(
        @Param('id') id: string,  // Aceptar el ID como parámetro
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
        return this.fileUploadService.uploadPropertyImage(id, file);  // Pasar el ID al servicio
    }
}
