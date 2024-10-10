import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudinaryRepository } from './cloudinary.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/properties/property.entity';
import { CloudinaryConfig } from 'src/config/cloudinary.config';

Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
  ],
  providers: [
    CloudinaryConfig,
    CloudinaryService,
    CloudinaryRepository,
  ],
  exports: [
    CloudinaryService,
    CloudinaryRepository 
  ],
})
export class CloudinaryModule {}