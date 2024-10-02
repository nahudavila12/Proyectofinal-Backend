// cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService], // Exportamos el servicio para que otros módulos puedan usarlo
})
export class CloudinaryModule {}
