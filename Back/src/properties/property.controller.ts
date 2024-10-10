import { 
  BadRequestException,
  Body,
  Controller, 
  Get, 
  HttpStatus, 
  InternalServerErrorException, 
  Param, 
  ParseUUIDPipe, 
  Post, 
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { PropertyService } from "./property.service";
import { Property } from "./property.entity";
import { PropertyFilters } from "src/dtos/propertyFilters.dto";
import { RolesGuard } from "src/guards/roles.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { CreatePropertyDto } from "src/dtos/createProperty.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "src/decorators/multerOptions";



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
  
  @Post('addProperty/:uuid')
    @UseInterceptors(FilesInterceptor('files', 5, multerOptions))
    async addProperty(
        @Param('uuid', ParseUUIDPipe) ownerUuid: string,
        @Body() createProperty: CreatePropertyDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return this.propertyService.addProperty(ownerUuid, createProperty, files);
    }
}
