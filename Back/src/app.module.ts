import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudinaryConfig } from './config/cloudinary';
import { CloudinaryService } from './commons/cloudinary.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './Config/typeOrm.config';
import { UserModule } from './users/user.module';
//import { OrdersModule } from './orderDetail/orders.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport'
import { AuthModule } from './auth/auth.module'; 
import { EmailModule } from './email/email.module';
import { OwnersModule } from './owners/owner.module';
import { PropertyModule } from './properties/property.module';
import { RoomsModule } from './rooms/room.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SeedService } from './preload/seed';
import { DashboardAdminModule} from './dashboardAdmin/dashboardAdmin.module';

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
    FileUploadModule,
    AuthModule,
    EmailModule,
    OwnersModule,
    DashboardAdminModule,
    PropertyModule,
    RoomsModule,
    ReservationsModule
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryConfig, CloudinaryService,SeedService],
})
export class AppModule {}