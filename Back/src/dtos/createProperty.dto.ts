
import { RoomDto } from "./createRoom.dto";
import { PropertyType } from "src/propierties/property.entity";

export class PropertyDto {
    name: string;
    location: string;
    owner: string;
    propertyType: PropertyType; 
    propertyImages?: string[];
    rooms?: RoomDto[];
  }
  