
import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { RoomDto } from "./createRoom.dto";
import { PropertyType } from "src/propierties/property.entity";

export class PropertyDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  owner:{owner:string};

  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  propertyImages?: string[];

  @IsOptional()
  @IsArray()
  @IsArray({ each: true })
  rooms?: RoomDto[];
}