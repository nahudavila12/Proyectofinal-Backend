import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { PropertyType } from "src/properties/property.entity";

export class PropertyFilters {
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsOptional()
    @IsEnum(PropertyType)
    propertyType?: PropertyType;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    minPrice?: number;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    maxPrice?: number;
  }