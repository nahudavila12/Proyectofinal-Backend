import { Injectable, NotFoundException } from "@nestjs/common";
import { Property } from "../propierties/property.entity";
import { PropiertiesRepository } from "./propierties.repository";



@Injectable()
export class PropertyService {
  constructor(private readonly propiertiesRepository: PropiertiesRepository) {}

  async getProperties(): Promise<Property[]> {
    return this.propiertiesRepository.getPropierties();
  }
 
  
  async getPropertyById(uuid: string): Promise<Property> {
    const property = await this.propiertiesRepository.getPropertyById(uuid);
    if (!property) {
      throw new NotFoundException(`Propiedad con  ${uuid} no encontrado`);
    }
    return property;
  }

}
