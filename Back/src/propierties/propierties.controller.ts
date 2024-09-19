import { Get, Param, ParseUUIDPipe } from "@nestjs/common";
import { PropertyService } from "./propierties.service";



export class PropertyController{
  constructor(private readonly propertyService: PropertyService){}

  @Get()
  getProperty() {
    return this.propertyService.getProperties();
  }

  @Get(':id')
  getProductById(@Param('uuid',ParseUUIDPipe) uuid: string) {
    return this.propertyService.getPropertyById(uuid);
  }
}