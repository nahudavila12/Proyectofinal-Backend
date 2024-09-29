import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner.entity';
import { Property } from 'src/properties/property.entity';
import { User } from 'src/users/user.entity';
import { OwnerRepository } from './owner.repository';
import { OwnerController } from './owner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Property, User])],
  providers: [OwnerService, OwnerRepository],
  controllers: [OwnerController],
  exports: [OwnerService, OwnerRepository]
})
export class OwnersModule {}
