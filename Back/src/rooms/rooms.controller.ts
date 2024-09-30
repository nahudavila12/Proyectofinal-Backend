import { 
    Controller,
    Param,
    ParseUUIDPipe,
    Post,
    Body
} from '@nestjs/common';
import { RoomService } from '../rooms/room.service';
import { CreateRoomDto } from 'src/dtos/createRoom.dto';

@Controller('rooms')
export class RoomsController {
    constructor(
        private readonly roomService: RoomService
    ){}

    @Post('addRoom/:uuid')
    async addRoom(
        @Param('uuid', ParseUUIDPipe) uuid:string,
        @Body() newRoom: CreateRoomDto
    ){
        return this.roomService.addRoom(uuid, newRoom)
    }


}
