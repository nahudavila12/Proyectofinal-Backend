import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CloudinaryConfig } from './config/cloudinary';
import { CloudinaryService } from './commons/cloudinary.service';
import { SeedCommand } from './seeds/seed.command';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import typeOrmConfig from './Config/typeOrm.config';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeOrm'),
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig, CloudinaryService, SeedCommand],
})
export class AppModule {}
