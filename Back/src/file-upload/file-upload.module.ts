import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomImg } from '../rooms/roomImg.entity'; 
import { PropertyImg } from '../propierties/propertyImg.entity'; // Asegúrate de que esta ruta sea correcta
import { CloudinaryService } from '../commons/cloudinary.service';

@Module({
    imports: [TypeOrmModule.forFeature([RoomImg, PropertyImg])],
    controllers: [FileUploadController],
    providers: [FileUploadService, FileUploadRepository, CloudinaryService],
})
export class FileUploadModule {}
