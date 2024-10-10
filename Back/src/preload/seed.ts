import { Injectable, OnModuleInit } from '@nestjs/common';
import { conectionSource } from '../Config/typeOrm.config'; 
import { Property } from '../properties/property.entity';
import { Owner } from '../owners/owner.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Room } from 'src/rooms/room.entity';
import { RoomImg } from 'src/rooms/roomImg.entity';
import { PropertyImg } from 'src/properties/propertyImg.entity';
import cloudinary from 'cloudinary';

@Injectable()
export class SeedService implements OnModuleInit {
  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    await conectionSource.initialize(); 

    // Configuración de Cloudinary
/*     cloudinary.v2.config({
      cloud_name: 'CLOUDINARY_CLOUD_NAME', // Reemplaza con tu nombre de cloud
      api_key: 'CLOUDINARY_API_KEY', // Reemplaza con tu API key
      api_secret: 'CLOUDINARY_API_SECRET', // Reemplaza con tu API secret
    }); */
  
    try {
      const dataFilePath = path.join(__dirname, '..', '..', 'data.json');
      const jsonData = fs.readFileSync(dataFilePath, 'utf8');
      const properties = JSON.parse(jsonData);

      for (const propertyData of properties) {
        let owner = await conectionSource.getRepository(Owner).findOneBy({ uuid: propertyData.owner.uuid });
  
        // Si no se encuentra el owner, se crea uno nuevo
        if (!owner) {
          owner = conectionSource.getRepository(Owner).create({
            uuid: propertyData.owner.uuid,
            bussines_name: propertyData.owner.bussines_name,
            bussinesId: propertyData.owner.bussinesId,
            phone: propertyData.owner.phone,
            email: propertyData.owner.email,
          });
          await conectionSource.getRepository(Owner).save(owner);
        }

        // Crear y guardar propiedad
        const property = conectionSource.getRepository(Property).create({
          name: propertyData.name,
          location: propertyData.location,
          propertyType: propertyData.propertyType,
          rate: propertyData.rate || 0,
          isActive: propertyData.isActive !== undefined ? propertyData.isActive : true,
          owner,
          propImg: [], // Inicializamos con un array vacío
        });

        // Guardar la propiedad en la base de datos
        await conectionSource.getRepository(Property).save(property);

        // Guardar imágenes de la propiedad en Cloudinary
        if (propertyData.propImg && Array.isArray(propertyData.propImg)) {
          let validImagesCount = 0;
          let invalidImagesCount = 0;

          for (const img of propertyData.propImg) {
            if (img.img && img.img.trim()) { // Verifica que img no sea nulo y no esté vacío
              try {
                const uploadResult = await cloudinary.v2.uploader.upload(img.img);
                const propertyImg = conectionSource.getRepository(PropertyImg).create({
                  img: uploadResult.secure_url, // URL de la imagen subida
                  property: property, // Usa 'property' aquí
                });
                await conectionSource.getRepository(PropertyImg).save(propertyImg);
                validImagesCount++;
              } catch (uploadError) {
                console.error('Error al subir la imagen de propiedad:', uploadError);
                invalidImagesCount++;
              }
            } else {
              console.error('Imagen de propiedad nula para:', propertyData.name);
              invalidImagesCount++;
            }
          }

          console.log(`Total imágenes válidas: ${validImagesCount}, Imágenes inválidas: ${invalidImagesCount}`);
        }

        // Crear y guardar habitaciones
        for (const roomData of propertyData.rooms) {
          // Crear habitación
          const room = conectionSource.getRepository(Room).create({
            room_number: roomData.room_number,
            capacity: roomData.capacity,
            price_per_day: roomData.price_per_day,
            disponibility: roomData.disponibility,
            roomCategory: roomData.roomCategory,
            property: property,
          });
        
          // Guardar la habitación en la base de datos
          const savedRoom = await conectionSource.getRepository(Room).save(room);
          console.log('Habitación guardada:', savedRoom);
        
          // Guardar imágenes de la habitación en Cloudinary
          if (roomData.roomImages && Array.isArray(roomData.roomImages)) {
            let validImagesCount = 0;
            let invalidImagesCount = 0;

            for (const img of roomData.roomImages) {
              if (img.img) { // Verifica que img no sea nulo
                try {
                  const uploadResult = await cloudinary.v2.uploader.upload(img.img);
                  const roomImg = conectionSource.getRepository(RoomImg).create({
                    img: uploadResult.secure_url, // URL de la imagen subida
                    room: savedRoom,
                  });
                  await conectionSource.getRepository(RoomImg).save(roomImg);
                  validImagesCount++;
                } catch (uploadError) {
                  console.error('Error al subir la imagen de habitación:', uploadError);
                  invalidImagesCount++;
                }
              } else {
                console.error('Imagen de habitación nula o vacía para:', roomData.room_number);
                invalidImagesCount++;
              }
            }

            console.log(`Total imágenes válidas de habitación: ${validImagesCount}, Imágenes inválidas: ${invalidImagesCount}`);
          }
        }
      }

      console.log('Datos precargados exitosamente.');
    } catch (error) {
      console.error('Error al precargar los datos:', error);
    } finally {
      await conectionSource.destroy();
    }
  }
}
