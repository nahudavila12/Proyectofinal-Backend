

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

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Properties')
@Controller('properties')
@UseGuards(RolesGuard)
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todas las propiedades' })
  @ApiResponse({
    status: 200,
    description: 'Lista de propiedades devuelta con éxito',
    type: [Property],
  })
  async getProperties(): Promise<Property[]> {
    return this.propertyService.getProperties();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Obtener una propiedad por UUID' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID de la propiedad a buscar',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Propiedad encontrada',
    type: Property,
  })
  @ApiResponse({ status: 404, description: 'Propiedad no encontrada' })
  async getPropertyById(
    @Param('uuid', ParseUUIDPipe) uuid: string,
  ): Promise<Property> {
    return this.propertyService.getPropertyById(uuid);
  }

  @Get('search')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Buscar propiedades utilizando filtros' })
  @ApiQuery({
    name: 'filters',
    type: PropertyFilters,
    description: 'Filtros de búsqueda',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de propiedades devuelta con éxito',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  async findPropertiesByFilters(@Query() filters: PropertyFilters) {
    try {
      const properties =
        await this.propertyService.findPropertiesByFilters(filters);
      return {
        statusCode: HttpStatus.OK,
        data: properties,
      };
    } catch (error) {
      console.error('Error buscando propiedades por filtros:', error.message);
      throw new InternalServerErrorException(
        'Hubo un problema al buscar las propiedades.',
      );
    }
  }
  @Post('addProperty/:uuid')
  @ApiOperation({ summary: 'Agregar una propiedad nueva' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario o entidad que agrega la propiedad',
    type: 'string',
  })
  @ApiBody({
    type: CreatePropertyDto,
    description: 'Información de la nueva propiedad',
  }) 
  @ApiResponse({ status: 201, description: 'Propiedad creada con éxito' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  @UseInterceptors(FilesInterceptor('files', 5, multerOptions))
  async addProperty(
    @Param('uuid', ParseUUIDPipe) ownerUuid: string,
    @Body() createProperty: CreatePropertyDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.propertyService.addProperty(ownerUuid, createProperty, files);
  }
}
