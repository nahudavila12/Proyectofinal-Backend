
import { 
  IsArray, 
  IsEnum, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Length, 
  Matches
} from "class-validator";
import { CreateRoomDto } from "./createRoom.dto";
import { PropertyType } from "src/properties/property.entity";
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
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  propImg?: (Express.Multer.File)[];

  @IsOptional()
  @IsArray()
  @IsArray({ each: true })
  rooms?: CreateRoomDto[];
}