import { 
  Body,
  Controller, 
  Get, 
  HttpStatus, 
  InternalServerErrorException, 
  Param, 
  ParseUUIDPipe, 
  Post, 
  Query,
  UseGuards,
} from "@nestjs/common";
import { PropertyService } from "./property.service";
import { Property } from "./property.entity";
import { PropertyFilters } from "src/dtos/propertyFilters.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { CreatePropertyDto } from "src/dtos/createProperty.dto";



@Controller('properties')
@UseGuards(RolesGuard)
export class PropertyController{
  constructor(private readonly propertyService: PropertyService){}


  @Get() 
  async getProperties(): Promise<Property[]> {
      return this.propertyService.getProperties(); 
  }

  @Get(':uuid') 
  async getPropertyById(@Param('uuid', ParseUUIDPipe) uuid: string): Promise<Property> {
      return this.propertyService.getPropertyById(uuid); 
  }

  @Get('search')
  @UseGuards(AuthGuard) 
  async findPropertiesByFilters(@Query() filters: PropertyFilters) {
    try {
      const properties = await this.propertyService.findPropertiesByFilters(filters);
      return {
        statusCode: HttpStatus.OK,
        data: properties,
      };
    } catch (error) {
      console.error('Error buscando propiedades por filtros:', error.message);
      throw new InternalServerErrorException('Hubo un problema al buscar las propiedades.');
    }
  }
  
  @Post('addProperty/:id')
  async addProperty(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newProperty: CreatePropertyDto
  ) {
    return await this.propertyService.addProperty(id, newProperty);

}
}