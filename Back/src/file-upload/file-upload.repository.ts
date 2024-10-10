// import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { RoomImg } from '../rooms/roomImg.entity';
// import { PropertyImg } from '../properties/propertyImg.entity';
// import { Room } from '../rooms/room.entity';
// import { Property } from '../properties/property.entity';
// import { Profile } from 'src/profiles/profile.entity';

// @Injectable()
// export class FileUploadRepository {
//     constructor(
//         @InjectRepository(RoomImg)
//         private readonly roomImgRepository: Repository<RoomImg>,
//         @InjectRepository(PropertyImg)
//         private readonly propertyImgRepository: Repository<PropertyImg>,
//         @InjectRepository(Profile)
//         private readonly profileRepository: Repository<Profile>,
//     ) {}

//     async saveRoomImage(roomId: string, image: string): Promise<RoomImg> {
//         const roomImg = new RoomImg();
//         roomImg.img = image;

//         roomImg.room = { uuid: roomId } as Room;
//         return this.roomImgRepository.save(roomImg);
//     }

//     async savePropertyImage(propertyId: string, image: string): Promise<PropertyImg> {
//         const propertyImg = new PropertyImg();
//         propertyImg.img = image;

//         propertyImg.property = { uuid: propertyId } as Property;
//         return this.propertyImgRepository.save(propertyImg);
//     }

//     async saveUserProfileImage(userId: string, imageUrl: string) {
//         const user = await this.profileRepository.findOne({ where: { uuid: userId } });
//         if (user) {
//             user.userIMG = imageUrl; // Asume que tienes un campo profileImageUrl en tu entidad User
//             return this.profileRepository.save(user);
//         }
//         throw new Error('User not found');
//     }
// }
