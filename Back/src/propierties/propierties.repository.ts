import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "../Entities/property.entity";
import { Repository } from "typeorm";



Injectable()
export class PropiertiesRepository{
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
    ){}

    async  getPropierties(): Promise<Property[]> {
        return this.propertyRepository.find()
      }

    async getPropertyById(uuid: string): Promise<Property>{
       const property = await this.propertyRepository.findOne({ where: { uuid } });
       if(!property || !property){
        throw new NotFoundException(`Alojamiento no existe o no se encuentra disponible`);
      }
      return property;  
    }
}