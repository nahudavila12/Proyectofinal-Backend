import { Injectable, NotFoundException } from "@nestjs/common";
import { Property } from "../properties/property.entity";
import { PropertyRepository } from "./property.repository";
import { PropertyFilters } from "src/dtos/propertyFilters.dto";
import { PropertyDto } from "src/dtos/createProperty.dto";
import { CloudinaryService } from "src/commons/cloudinary.service"; // Asegúrate de tener esto importado
import { PropertyImg } from "./propertyImg.entity";




@Injectable()
export class PropertyService {
  constructor(
    private readonly propiertiesRepository: PropertyRepository,
    private readonly cloudinaryService: CloudinaryService   
  ) {}

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

  async removeProperty(uuid: string): Promise<string> {
    try {
      return await this.propiertiesRepository.removeProperty(uuid);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error eliminando propiedad:', error.message);
      throw new Error('Hubo un problema al eliminar la propiedad');
    }
  }
  
  async banProperty(uuid: string, ban: boolean): Promise<string> {
    try {
      return await this.propiertiesRepository.banProperty(uuid, ban);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error al banear o reactivar propiedad:', error.message);
      throw new Error('Hubo un problema al banear o reactivar la propiedad');
    }
  }

  async updateProperty(uuid: string, updateData: Partial<Property>): Promise<Property> {
    try {
      return await this.propiertiesRepository.updateProperty(uuid, updateData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error actualizando la propiedad:', error.message);
      throw new Error('Hubo un problema al actualizar la propiedad');
    }
  }

  async findPropertiesByFilters(filters: PropertyFilters): Promise<Property[]> {
    try {

      return await this.propiertiesRepository.findPropertiesByFilters(filters);
    } catch (error) {
      console.error('Error buscando propiedades por filtros:', error.message);
      throw new Error('Hubo un problema al buscar las propiedades');
    }
  }

  // Dentro del método addProperty
async addProperty(id: string, newProperty: PropertyDto) {
  // Agrega la propiedad a la base de datos
  const property = await this.propiertiesRepository.addProperty(id, newProperty);

  // Manejo de carga de imágenes
  if (newProperty.propImg && newProperty.propImg.length > 0) {
    try {
      // Carga las imágenes en paralelo
      const propertyImages = await Promise.all(
        newProperty.propImg.map(async (file) => {
          const uploadResult = await this.cloudinaryService.uploadImage(file);
          const propertyImg = new PropertyImg();
          propertyImg.img = uploadResult.secure_url;
          propertyImg.property = property; // Establece la relación con la propiedad
          return propertyImg; // Retorna el objeto PropertyImg
        })
      );

      // Guarda todas las imágenes en la base de datos
      const savedImages = await this.propiertiesRepository.saveImages(propertyImages);

      // Verificación de que se guardaron todas las imágenes
      if (savedImages.length !== propertyImages.length) {
        throw new Error('No se guardaron todas las imágenes en la base de datos');
      }
    } catch (error) {
      console.error('Error al subir imágenes:', error);
      throw new Error('Hubo un problema al cargar las imágenes');
    }
  }

  return property; // Retorna la propiedad creada
}

  

}


