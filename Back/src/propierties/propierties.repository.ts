import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "../propierties/property.entity";
import * as propertyData from '../../data.json';
import { Repository } from "typeorm";
import {  Room } from "src/rooms/room.entity";
import { PropertyImg } from "./propertyImg.entity";
import { RoomImg } from "src/rooms/roomImg.entity";
import { PropertyType } from "./property.entity";
import { RoomService } from "src/rooms/roomService.entity";
import { Owner } from "src/owners/owner.entity";
import { PropertyFilters } from "src/dtos/propertyFilters.dto";

@Injectable()
export class PropiertiesRepository {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(PropertyImg)
        private readonly propertyImgRepository: Repository<PropertyImg>,
        @InjectRepository(RoomImg)
        private readonly roomImgRepository: Repository<RoomImg>,
        @InjectRepository(RoomService)
        private readonly roomServiceRepository: Repository<RoomService>,
        @InjectRepository(Owner)
        private readonly ownerRepository: Repository<Owner>
    ) {}

    async getPropierties(): Promise<Property[]> {
        return this.propertyRepository.find();
    }

    async getPropertyById(uuid: string): Promise<Property> {
        const property = await this.propertyRepository.findOne({ where: { uuid } });

        if (!property) {
            throw new NotFoundException(`Alojamiento no existe`);
        }

        return property;
    }


    async removeProperty(uuid: string): Promise<string> {
      const property = await this.propertyRepository.findOne({ where: { uuid } });
  
      if (!property) {
          throw new NotFoundException(`Propiedad no encontrada: ${uuid}`);
      }
  
  
      await this.propertyImgRepository.delete({ property: { uuid } });
  

      const rooms = await this.roomRepository.find({ where: { property: { uuid } } });
      for (const room of rooms) {

          await this.roomImgRepository.delete({ room: { uuid: room.uuid } });

          await this.roomServiceRepository.delete({ room: { uuid: room.uuid } });
      }
  

      await this.roomRepository.delete({ property: { uuid } });

      await this.propertyRepository.remove(property);
  
      return `Propiedad eliminada exitosamente: ${uuid}`;
  }

  async banProperty(uuid: string, ban: boolean): Promise<string> {
    const property = await this.propertyRepository.findOne({ where: { uuid } });

    if (!property) {
        throw new NotFoundException(`Propiedad no encontrada: ${uuid}`);
    }


    property.isActive = false;
    await this.propertyRepository.save(property);

    return `Propiedad ${ban ? 'baneada' : 'reactivada'} exitosamente: ${uuid}`;
}

  async updateProperty(uuid: string, updateData: Partial<Property>): Promise<Property> {
  const property = await this.propertyRepository.findOne({ where: { uuid } });

  if (!property) {
      throw new NotFoundException(`Propiedad no encontrada: ${uuid}`);
  }

  Object.assign(property, updateData);

  const updatedProperty = await this.propertyRepository.save(property);
  
  return updatedProperty;
}

async findPropertiesByFilters(filters: PropertyFilters): Promise<Property[]> {
  const queryBuilder = this.propertyRepository.createQueryBuilder('property');


  if (filters.location) {
      queryBuilder.andWhere('property.location = :location', { location: filters.location });
  }

  if (filters.propertyType) {
      queryBuilder.andWhere('property.propertyType = :propertyType', { propertyType: filters.propertyType });
  }

  if (filters.minPrice) {
      queryBuilder.andWhere('property.price >= :minPrice', { minPrice: filters.minPrice });
  }

  if (filters.maxPrice) {
      queryBuilder.andWhere('property.price <= :maxPrice', { maxPrice: filters.maxPrice });
  }
  return await queryBuilder.getMany();
}
}
