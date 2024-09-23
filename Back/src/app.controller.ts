import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { CloudinaryService } from './commons/cloudinary.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @ApiOperation({ summary: 'post image' })
  @ApiResponse({ status: 200, description: 'img uploaded' })
  @Post('images')
  @UseInterceptors(FileInterceptor('file'))
  postImages(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 20 * 1024 * 1024, // 2MB
            message: 'El archivo debe ser menor a 2MB', // Mensaje de error ajustado
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/, // Tipos de archivos permitidos
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.cloudinaryService.uploadImage(file);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
