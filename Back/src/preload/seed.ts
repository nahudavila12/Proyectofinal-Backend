import { Injectable, OnModuleInit } from '@nestjs/common';
import { conectionSource } from '../Config/typeOrm.config'; 
import { Property } from '../properties/property.entity';
import { Owner } from '../owners/owner.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Room } from 'src/rooms/room.entity';

@Injectable()
export class SeedService implements OnModuleInit {
  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    await conectionSource.initialize(); 
  
    try {
      const dataFilePath = path.join(__dirname, '..', '..', 'data.json');
      const jsonData = fs.readFileSync(dataFilePath, 'utf8');
      const properties = JSON.parse(jsonData);
  
      for (const propertyData of properties) {
        let owner = await conectionSource.getRepository(Owner).findOneBy({ uuid: propertyData.owner.uuid });
  
        // Si no se encuentra el owner, se crea uno nuevo con los datos de propertyData
        if (!owner) {
          owner = conectionSource.getRepository(Owner).create({
            uuid: propertyData.owner.uuid,
            bussines_name: propertyData.owner.bussines_name, // Cambiado aquí
            bussinesId: propertyData.owner.bussinesId, // Cambiado aquí
            phone: propertyData.owner.phone, // Cambiado aquí
            email: propertyData.owner.email, // Cambiado aquí
          });
          await conectionSource.getRepository(Owner).save(owner);
        }
  
        const property = conectionSource.getRepository(Property).create({
          name: propertyData.name,
          location: propertyData.location,
          propertyType: propertyData.propertyType,
          rate: propertyData.rate || 0,
          isActive: propertyData.isActive !== undefined ? propertyData.isActive : true,
          owner,
          propImg: propertyData.propImg || [],
        });
  
        const savedProperty = await conectionSource.getRepository(Property).save(property);
  
        for (const roomData of propertyData.rooms) {
          const room = conectionSource.getRepository(Room).create({
            room_number: roomData.room_number,
            capacity: roomData.capacity,
            price_per_day: roomData.price_per_day,
            disponibility: roomData.disponibility,
            roomImages: roomData.roomImages || [],
            roomServices: roomData.services || [],
            roomCategory: roomData.roomCategory,
            property: savedProperty, 
          });
          await conectionSource.getRepository(Room).save(room);
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
