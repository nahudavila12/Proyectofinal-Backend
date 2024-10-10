import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateOwnerDto } from 'src/dtos/createOwner.dto';
import { Owner } from './owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Owner) private readonly ownerRepository: Repository<Owner>,
  ) {}

  async addOwner(userUuid: string, newOwner: CreateOwnerDto): Promise<string> {
    const user = await this.userRepository.findOne({ where: { uuid: userUuid } });
  
    if (!user) {
      throw new NotFoundException(`Usuario con uuid ${userUuid} no encontrado`);
    }
  
    const owner = this.ownerRepository.create({
      ...newOwner,
      user, // Asociación con el usuario
    });
  
    const savedOwner = await this.ownerRepository.save(owner);
  
    // Retornar el UUID del nuevo propietario
    return savedOwner.uuid; // Asegúrate de que el UUID está disponible en el objeto `savedOwner`
  }
  
}

