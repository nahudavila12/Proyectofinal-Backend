
import { 
  IsArray, 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length 
} from "class-validator";
import { RoomDto } from "./createRoom.dto";
import { PropertyType } from "src/propierties/property.entity";
import { Owner } from "src/owners/owner.entity";

export class PropertyDto {
  
  @IsNotEmpty()
  @Length(4, 20)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(4, 20)
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  owner: Owner;

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