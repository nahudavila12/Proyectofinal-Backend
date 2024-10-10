
import { 
  IsArray, 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUUID, 
  Length,
  ValidateNested, 
} from "class-validator";
import { CreateRoomDto } from "./createRoom.dto";
import { PropertyType } from "src/properties/property.entity";
import { Type } from "class-transformer";

export class CreatePropertyDto {
  
  @IsNotEmpty()
  @Length(4, 20)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(4, 20)
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsEnum(PropertyType)
  propertyType: PropertyType;

}