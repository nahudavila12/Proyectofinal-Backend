
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
  @IsEnum(PropertyType)
  propertyType: PropertyType;

  @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Matches(/^data:image\/(png|jpeg|jpg);base64,[A-Za-z0-9+/=]+$/, 
      { message: 'El texto de imagen debe ser en formato Base64 válido.' })
    propImg?: (Express.Multer.File)[];

  @IsOptional()
  @IsArray()
  @IsArray({ each: true })
  rooms?: CreateRoomDto[];
}