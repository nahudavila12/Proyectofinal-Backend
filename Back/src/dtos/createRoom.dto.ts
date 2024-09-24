import { IsArray, IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { IRoomState } from "src/rooms/room.entity";
import { ICategories } from "../rooms/roomCategory.entity"

export class RoomDto {
  @IsNumber()
  @Min(1) 
  room_number: number;

  @IsOptional()
  @IsEnum(ICategories)
  category?: ICategories;

  @IsNumber()
  @Min(1) 
  capacity: number;

  @IsNumber()
  @Min(0) 
  price_per_day: number;

  @IsEnum(IRoomState)
  disponibility: IRoomState;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  roomImages?: string[];
  
  @IsOptional()
  @IsArray()
  @IsString({ each: true }) 
  services?: string[];
}