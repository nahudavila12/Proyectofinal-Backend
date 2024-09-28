import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Property } from './property.entity';
import { PropertyRepository } from './property.repository';
import { PropertyService } from './property.service';
import { PropertyController } from './property.controller';
import { Owner } from 'src/owners/owner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Owner]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PropertyService, PropertyRepository],
  controllers: [PropertyController],
  exports: [PropertyRepository, PropertyService],
})
export class PropertyModule {}
