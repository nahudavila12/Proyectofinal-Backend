import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryConfig } from './config/cloudinary';
import { CloudinaryService } from './commons/cloudinary.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig, CloudinaryService],
})
export class AppModule {}
