import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Property } from "./property.entity";
import { Repository } from "typeorm";
import {  Room } from "src/rooms/room.entity";
import { PropertyImg } from "./propertyImg.entity";
import { RoomImg } from "src/rooms/roomImg.entity";
import { Owner } from "src/owners/owner.entity";
import { PropertyFilters } from "src/dtos/propertyFilters.dto";
import { CreatePropertyDto } from "src/dtos/createProperty.dto";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

class PropertyReturned{
    propertyName: string;
    propertyUuid: string;
    ownerName: string;
    ownerUuid: string
}

@Injectable()
export class PropertyRepository {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(PropertyImg)
        private readonly propertyImgRepository: Repository<PropertyImg>,
        @InjectRepository(Owner)
        private readonly ownerRepository: Repository<Owner>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async getProperties(): Promise<Property[]> {
        return this.propertyRepository.find({
            relations: [ 'room'], 
        });
    }
    async getPropertyById(uuid: string): Promise<Property> {
      const property = await this.propertyRepository.findOne({
          where: { uuid },
          relations: [ 'room'], 
      });
    
      if (!property) {
          throw new NotFoundException(`Propiedad con ${uuid} no encontrado`);
      }
    
      return property;
    }

    async removeProperty(uuid: string): Promise<string> {
      const property = await this.propertyRepository.findOne({ where: { uuid } });
  
      if (!property) {
          throw new NotFoundException(`Propiedad no encontrada: ${uuid}`);
      }
  
  
      await this.propertyImgRepository.delete({ property: { uuid } });
  
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

async addProperty(ownerUuid: string, createProperty: CreatePropertyDto, files: Express.Multer.File[]): Promise<PropertyReturned | null> {
    const owner = await this.ownerRepository.findOneBy({ uuid: ownerUuid });
    if (!owner) throw new NotFoundException('Propietario no encontrado');

    const { name } = createProperty;
    const foundProperty = await this.propertyRepository.findOneBy({ name });
    if (foundProperty) throw new ConflictException('Propiedad ya existente');

    const newProperty = new Property();
    Object.assign(newProperty, createProperty);
    newProperty.propertyType = createProperty.propertyType;
    newProperty.owner = owner;

    const addedProperty = await this.propertyRepository.save(newProperty);
    
    try {
        const uploadedImages = await Promise.all(files.map(file => this.cloudinaryService.uploadPropertyImage(addedProperty.uuid, file)));

        return {
            propertyName: addedProperty.name,
            propertyUuid: addedProperty.uuid,
            ownerName: addedProperty.owner.bussines_name,
            ownerUuid: addedProperty.owner.uuid    
        } as PropertyReturned;

    } catch (error) {
        await this.propertyRepository.delete(addedProperty.uuid); 
        throw new ConflictException(`Ocurrió un error al crear la propiedad: ${error.message}`);
    }
}

async saveImages(images: PropertyImg[]): Promise<PropertyImg[]> {
    return await this.propertyImgRepository.save(images);
  }

}        


