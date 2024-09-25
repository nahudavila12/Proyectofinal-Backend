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
import { OrdersModule } from './orders/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'

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
    PassportModule.register({ session: false }),
    JwtModule.register({
        secret: process.env.JWT_SECRET, 
        signOptions: { expiresIn: '60s' },
    }),
    UserModule,
    OrdersModule,
    FileUploadModule
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig, CloudinaryService, SeedCommand],
})
export class AppModule {}
