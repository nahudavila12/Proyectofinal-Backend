import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomImg } from '../rooms/roomImg.entity';
import { PropertyImg } from '../propierties/propertyImg.entity';
import { Room } from '../rooms/room.entity';
import { Property } from '../propierties/property.entity';

@Injectable()
export class FileUploadRepository {
    constructor(
        @InjectRepository(RoomImg)
        private readonly roomImgRepository: Repository<RoomImg>,
        @InjectRepository(PropertyImg)
        private readonly propertyImgRepository: Repository<PropertyImg>,
    ) {}

    // Guardar imagen de habitación con relación a su ID
    async saveRoomImage(roomId: string, image: string): Promise<RoomImg> {
        const roomImg = new RoomImg();
        roomImg.img = image;

        // Establece la relación con la habitación
        roomImg.room = { uuid: roomId } as Room;
        return this.roomImgRepository.save(roomImg);
    }

    // Guardar imagen de propiedad con relación a su ID
    async savePropertyImage(propertyId: string, image: string): Promise<PropertyImg> {
        const propertyImg = new PropertyImg();
        propertyImg.img = image;

        // Establece la relación con la propiedad
        propertyImg.property = { uuid: propertyId } as Property;
        return this.propertyImgRepository.save(propertyImg);
    }
}
