import { Injectable } from '@nestjs/common';
import { RoomRepository } from './room.Repository';
import { CreateRoomDto } from 'src/dtos/createRoom.dto';

@Injectable()
export class RoomService {
    constructor(
        private readonly roomRepository: RoomRepository
    ){}

    async addRoom(uuid: string, newRoom: CreateRoomDto, files: Express.Multer.File[]){

        return await this.roomRepository.addRoom(uuid, newRoom, files)
    }
}
