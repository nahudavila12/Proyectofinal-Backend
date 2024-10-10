import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  HttpStatus, 
  NotFoundException, 
  Param, 
  ParseUUIDPipe, 
  Patch, 
  Post, 
  Query
} from "@nestjs/common";
import { PropertyService } from "./property.service";
import { Property } from "./property.entity";
import { PropertyFilters } from "src/dtos/propertyFilters.dto";
import { CreatePropertyDto } from "src/dtos/createProperty.dto";



@Controller('properties')
export class PropertyController{
  constructor(private readonly propertyService: PropertyService){}


  @Get()
  async getProperties(): Promise<Property[]> {
    return this.propertyService.getProperties();
  }


  @Get(':uuid') 
  async getPropertyById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.propertyService.getPropertyById(uuid);
  }
  
  @Delete(':uuid') 
  async removeProperty(@Param('uuid') uuid: string) {
    try {
      const result = await this.propertyService.removeProperty(uuid);
      return {
        statusCode: HttpStatus.OK,
        message: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error eliminando propiedad:', error.message);
      throw new Error('Hubo un problema al eliminar la propiedad');
    }
  }


  @Patch(':uuid/ban') 
  async banProperty(@Param('uuid') uuid: string, @Body('ban') ban: boolean) {
    try {
      const result = await this.propertyService.banProperty(uuid, ban);
      return {
        statusCode: HttpStatus.OK,
        message: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error al banear o reactivar propiedad:', error.message);
      throw new Error('Hubo un problema al banear o reactivar la propiedad');
    }
  }

  @Patch(':uuid')
  async updateProperty(@Param('uuid') uuid: string, @Body() updateData: Partial<Property>) {
    try {
      const updatedProperty = await this.propertyService.updateProperty(uuid, updateData);
      return {
        statusCode: HttpStatus.OK,
        data: updatedProperty,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error actualizando la propiedad:', error.message);
      throw new Error('Hubo un problema al actualizar la propiedad');
    }
  }

  @Get('search') 
  async findPropertiesByFilters(@Query() filters: PropertyFilters) {
    try {
      const properties = await this.propertyService.findPropertiesByFilters(filters);
      return {
        statusCode: HttpStatus.OK,
        data: properties,
      };
    } catch (error) {
      console.error('Error buscando propiedades por filtros:', error.message);
      throw new Error('Hubo un problema al buscar las propiedades');
    }
  }

  @Post('addProperty/:id')
  async addProperty(
    @Param('id', ParseUUIDPipe) id: string,
    @Body()newProperty: CreatePropertyDto
  ){
    return await this.propertyService.addProperty(id, newProperty)
  }
}
