import { Body, Controller, Param, ParseUUIDPipe, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/decorators/multerOptions';
import { CreateRoomDto } from 'src/dtos/createRoom.dto';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
    constructor(
        private readonly roomService: RoomService
    ){}

    @Post('addRoom/:uuid')
    @UseInterceptors(FilesInterceptor('files', 5, multerOptions))
    async addProperty(
        @Param('uuid', ParseUUIDPipe) propertyUuid: string,
        @Body() createProperty: CreateRoomDto,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        return this.roomService.addRoom(propertyUuid, createProperty, files);
    }
}
