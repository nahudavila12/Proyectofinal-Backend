import { 
  ConflictException,
  Injectable, 
  NotFoundException
} from '@nestjs/common';
import { CloudinaryRepository } from './cloudinary.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from 'src/properties/property.entity';
import { PropertyImg } from 'src/properties/propertyImg.entity';
import { RoomRepository } from 'src/rooms/room.Repository';
import { RoomImg } from 'src/rooms/roomImg.entity';
import { Room } from 'src/rooms/room.entity';
import { Profile } from 'src/profiles/profile.entity';

@Injectable()
export class CloudinaryService{
  constructor(
      private readonly cloudinaryRepository: CloudinaryRepository,
      @InjectRepository(Property)
      private readonly propertyRepository: Repository<Property>,
      @InjectRepository(PropertyImg)
      private readonly propertyImgRepository: Repository <PropertyImg>,
      @InjectRepository(Room)
      private readonly roomRepository: Repository<Room>,
      @InjectRepository(RoomImg)
      private readonly roomImgRepository: Repository<RoomImg>,
      @InjectRepository(Profile)
      private readonly profileRepository: Repository<Profile>
  ){}

  async uploadPropertyImage(propertyUuid: string, file: Express.Multer.File){
    try{
      const foundProperty = await this.propertyRepository.findOne({where: {uuid: propertyUuid}})
        if(!foundProperty)throw new NotFoundException('Propiedad no encontrada')

      const loadedImg = await this.cloudinaryRepository.uploadImage(file);
    
      const imgSaved = new PropertyImg()
      imgSaved.img = loadedImg.secure_url
      imgSaved.property = foundProperty

      await this.propertyImgRepository.save(imgSaved);

      return imgSaved;
    
    }catch(error){
      console.error('Cloudinary error:', error); 
      throw new ConflictException(`error:${error}`)
    }
  }

  async uploadRoomImage(roomUuid: string, file: Express.Multer.File){
    try{
      const foundRoom = await this.roomRepository.findOne({where: {uuid: roomUuid}})
        if(!foundRoom)throw new NotFoundException('Habitación no encontrada')

      const loadedImg = await this.cloudinaryRepository.uploadImage(file);
  
      const imgSaved = new RoomImg()
      imgSaved.img = loadedImg.secure_url
      imgSaved.room = foundRoom

      await this.roomImgRepository.save(imgSaved);

      return imgSaved;
  
    }catch(error){
      console.error('Cloudinary error:', error); 
      throw new ConflictException(`error:${error}`)
    }
  }

  async profileImgUploadImage(profileUuid: string, file: Express.Multer.File): Promise<Profile | null>{

    const foundProfile = await this.profileRepository.findOneBy({ uuid: profileUuid })
      if(!foundProfile) throw new NotFoundException(' Perfil de usuario no encontrado')

    const profileImg =  await this.cloudinaryRepository.uploadImage(file);
      if(!foundProfile) throw new ConflictException('Ocurrio un error al cargar la imagen')
    
    try{

      foundProfile.userIMG = profileImg.secure_url;
      await this.profileRepository.save(foundProfile)
    
      return foundProfile;

    }catch(error){
      throw new ConflictException('Error interno del servidor')
    }
  }
}
