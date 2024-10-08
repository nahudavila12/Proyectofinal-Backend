import { Injectable } from '@nestjs/common';
import { OwnerRepository } from './owner.repository';
import { CreateOwnerDto } from 'src/dtos/createOwner.dto';
import { Owner } from './owner.entity';
@Injectable()
export class OwnerService{
    constructor(
        private readonly ownerRespository: OwnerRepository
    ){}

    async addOwner(userUuid: string, newOwner: CreateOwnerDto): Promise<Partial<Owner> | null>{
        return await this.ownerRespository.addOwner(userUuid, newOwner)
    }
}
