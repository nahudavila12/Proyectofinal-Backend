import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateOwnerDto } from 'src/dtos/createOwner.dto';
import { CreatePropertyDto } from 'src/dtos/createProperty.dto';
import { CreateRoomDto } from 'src/dtos/createRoom.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { Property } from 'src/properties/property.entity';
import { PropertyService } from 'src/properties/property.service';
import { RoomService } from 'src/rooms/room.service';
import { UuidValidationPipe } from 'src/users/pipe/uuid-validation.pipe';
import { IRol } from 'src/users/user.entity';
import { OwnerService } from './owner.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Owner')
@Controller('owner')
@UseGuards(AuthGuard, RolesGuard)
export class OwnerController {
  constructor(
    private readonly propertyService: PropertyService,
    private readonly roomService: RoomService,
    private readonly ownerService: OwnerService,
  ) {}

  @Delete('propertie/delete/:uuid')
  @Roles(IRol.Owner, IRol.Admin)
  @ApiResponse({ status: 200, description: 'Property removed successfully.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  async removeProperty(@Param('uuid', UuidValidationPipe) uuid: string) {
    try {
      const result = await this.propertyService.removeProperty(uuid);
      return {
        statusCode: HttpStatus.OK,
        message: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error eliminando propiedad:', error.message);
      throw new InternalServerErrorException(
        'Hubo un problema al eliminar la propiedad',
      );
    }
  }

<<<<<<< HEAD


@Patch('propertie/update/:uuid')
@UseGuards(AuthGuard,RolesGuard) 
@Roles(IRol.Owner, IRol.Admin) 
async updateProperty(
  @Param('uuid', UuidValidationPipe) uuid: string, 
  @Body() updateData: Partial<Property>
) {
  try {
    const updatedProperty = await this.propertyService.updateProperty(uuid, updateData);
    return {
      statusCode: HttpStatus.OK,
      data: updatedProperty,
    };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw new NotFoundException(error.message);
    }
    console.error('Error actualizando la propiedad:', error.message);
    throw new InternalServerErrorException('Hubo un problema al actualizar la propiedad.');
  }
}



// @Post('addProperty/:uuid')
// @UseGuards(AuthGuard, RolesGuard) 
// @Roles(IRol.Owner) 
// async addProperty(
//   @Param('uuid', ParseUUIDPipe) uuid: string,
//   @Body() newProperty: CreatePropertyDto
// ) {
//   try { 
//     return await this.propertyService.addProperty(uuid, newProperty);
//   } catch (error) {
//     if (error instanceof NotFoundException) {
//       throw new NotFoundException(error.message);
//     }
//     throw new InternalServerErrorException('Error al agregar la propiedad.', error.message);
//   }
//}



// @Post('addRoom/:uuid')
// @Roles(IRol.Owner)
// async addRoom(
//     @Param('uuid', ParseUUIDPipe) uuid:string,
//     @Body() newRoom: CreateRoomDto
// ){
//     return this.roomService.addRoom(uuid, newRoom)
// }

@Post('addOwner/:uuid')
@UseGuards(AuthGuard,RolesGuard) 
@Roles(IRol.User)  
async addOwner(
  @Param('uuid', ParseUUIDPipe) userUuid: string,
  @Body() newOwner: CreateOwnerDto
=======
  @Patch('propertie/update/:uuid')
  @Roles(IRol.Owner, IRol.Admin)
  @ApiResponse({ status: 200, description: 'Property updated successfully.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  async updateProperty(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() updateData: Partial<Property>,
>>>>>>> 87abfb6fee617df2f78af7d1ed10a8f20cf6fac6
  ) {
    try {
      const updatedProperty = await this.propertyService.updateProperty(
        uuid,
        updateData,
      );
      return {
        statusCode: HttpStatus.OK,
        data: updatedProperty,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error actualizando la propiedad:', error.message);
      throw new InternalServerErrorException(
        'Hubo un problema al actualizar la propiedad.',
      );
    }
  }

  @Post('addProperty/:uuid')
  @Roles(IRol.Owner)
  @UseInterceptors(FilesInterceptor('propImg'))
  @ApiResponse({ status: 201, description: 'Property added successfully.' })
  @ApiResponse({ status: 404, description: 'Owner not found.' })
  async addProperty(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() newProperty: CreatePropertyDto,
  ) {
    try {
      newProperty.propImg = files;
      return await this.propertyService.addProperty(uuid, newProperty);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'Error al agregar la propiedad.',
        error.message,
      );
    }
  }

  @Post('addRoom/:uuid')
  @Roles(IRol.Owner)
  @ApiResponse({ status: 201, description: 'Room added successfully.' })
  async addRoom(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() newRoom: CreateRoomDto,
  ) {
    return this.roomService.addRoom(uuid, newRoom);
  }

  @Post('addOwner/:uuid')
  @Roles(IRol.User)
  @ApiResponse({ status: 201, description: 'Owner added successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async addOwner(
    @Param('uuid', ParseUUIDPipe) userUuid: string,
    @Body() newOwner: CreateOwnerDto,
  ) {
    try {
      const owner = await this.ownerService.addOwner(userUuid, newOwner);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Propietario agregado exitosamente',
        data: owner,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        'Hubo un problema al agregar el propietario',
      );
    }
  }
}
