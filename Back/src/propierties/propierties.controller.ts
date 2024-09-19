import { Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PropertyService } from './propierties.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @ApiOperation({ summary: 'get all propierties' })
  @ApiResponse({ status: 200, description: 'propierties fetched successfully' })
  @Get()
  getProperty() {
    return this.propertyService.getProperties();
  }

  @ApiOperation({ summary: 'get specific propierty by ID' })
  @ApiResponse({ status: 200, description: 'property fetched successfully' })
  @Get(':id')
  getProductById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.propertyService.getPropertyById(uuid);
  }
}
