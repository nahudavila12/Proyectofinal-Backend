import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Owner } from "./owner.entity";
import { Property } from "src/properties/property.entity";
import { User } from "src/users/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateOwnerDto } from '../dtos/createOwner.dto'

@Injectable()
export class OwnerRepository{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Owner)
        private readonly ownerRepository: Repository<Owner>,
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>
    ){}

    async createOwner(uuid: string, newOwner: CreateOwnerDto): Promise<Partial<Owner>> | null{

        const foundUser = await this.userRepository.findOneBy({uuid});
            if(!foundUser) throw new NotFoundException('Usuario no encontrado');

        const existingOwner = await this.ownerRepository.findOneBy({ bussinesId: newOwner.bussinesId });
        if (existingOwner) throw new ConflictException('Este ID de negocio ya está registrado.');
          
        const addOwner = new Owner()
        Object.assign(addOwner, newOwner)
        addOwner.user = foundUser

        const returnedOwner = await this.ownerRepository.save(addOwner);

        const { bussines_name, email, phone } = returnedOwner;
    
        return { bussines_name, email, phone };
    }
}