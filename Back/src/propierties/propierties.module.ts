import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Property } from '../propierties/property.entity';
import { PropiertiesRepository } from './propierties.repository';
import { PropertyService } from './propierties.service';
import { PropertyController } from './propierties.controller';
import { RoomService } from 'src/rooms/roomService.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PropertyService, PropiertiesRepository],
  controllers: [PropertyController],
  exports: [PropiertiesRepository, PropertyService,RoomService],
})
export class PropertyModule {}
