import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";

import { ICategories } from "../rooms/roomCategory.entity"
import { RoomImg } from "src/rooms/roomImg.entity";
import { RoomService } from "src/rooms/roomService.entity";

export class CreateRoomDto {
  @IsNumber()
  @Min(1) 
  room_number: number;

  @IsOptional()
  @IsEnum(ICategories)
  roomCategory?: ICategories;

  @IsNumber()
  @Min(1) 
  capacity: number;

  @IsNumber()
  @Min(0) 
  price_per_day: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  roomImages?: RoomImg[];
  
  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  services?: RoomService[];
}