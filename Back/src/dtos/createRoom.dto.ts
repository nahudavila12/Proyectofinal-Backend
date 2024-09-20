import { ICategories, IRoomState } from "src/rooms/room.entity";

export class RoomDto {
    room_number: number;
    category?: ICategories; 
    capacity: number;
    price_per_day: number;
    disponibility: IRoomState;
    roomImages?: string[];
    services?: string[];
  }

