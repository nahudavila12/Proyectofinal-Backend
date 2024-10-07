import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateOwnerDto } from "src/dtos/createOwner.dto";
import { UpdateReservationDto } from "src/dtos/createReservation.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { Roles } from "src/guards/roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";
import { OwnerService } from "src/owners/owner.service";
import { PropertyService } from "src/properties/property.service";
import { IStateBooking } from "src/reservations/reservation.entity";
import { ReservationService } from "src/reservations/reservation.service";
import { UuidValidationPipe } from "src/users/pipe/uuid-validation.pipe";
import { IRol } from "src/users/user.entity";
import { UserService } from "src/users/user.service";

@Controller('admin')
@UseGuards(RolesGuard,AuthGuard)
export class AdminController {
    constructor(
        private readonly ownerService: OwnerService,
        private readonly propertyService: PropertyService,
        private readonly reservationService: ReservationService,
        private readonly userService: UserService
    ){}


    @Post('addOwner/:uuid')
    @UseGuards(AuthGuard,RolesGuard) 
    @Roles(IRol.User, IRol.Admin) 
    async addOwner(
        @Param('uuid', ParseUUIDPipe) uuid: string,
        @Body() newOwner: CreateOwnerDto
    ) {
        try {
            const owner = await this.ownerService.addOwner(uuid, newOwner);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Propietario agregado exitosamente',
                data: owner,
            };
        } catch (error) {
            console.error('Error agregando propietario:', error.message);
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException('Hubo un problema al agregar el propietario');
        }
    }
    

    
  @Patch('propertie/ban/:uuid')
  @UseGuards(AuthGuard,RolesGuard) 
  @Roles(IRol.Admin) 
  async banProperty(
    @Param('uuid', UuidValidationPipe) uuid: string, 
    @Body('ban') ban: boolean 
  ) {
    try {
      const result = await this.propertyService.banProperty(uuid, ban);
      return {
        statusCode: HttpStatus.OK,
        message: result,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      console.error('Error al banear o reactivar propiedad:', error.message);
      throw new InternalServerErrorException('Hubo un problema al banear o reactivar la propiedad');
    }
  }
  


  @Get('reservation/all')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(IRol.Admin)
  async getAllReservations() {
    try {
      const reservations = await this.reservationService.getAllReservations();

      if (!reservations || reservations.length === 0) {
        throw new NotFoundException('No se encontraron reservas');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Reservas obtenidas exitosamente',
        data: reservations, 
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('No se encontraron reservas');
      }
      throw new InternalServerErrorException('Error al obtener las reservas.', error.message);
    }
  }
  


  
  @Patch('reservation/update:uuid')
  @UseGuards(AuthGuard,RolesGuard)
  @Roles(IRol.Admin)
  async updateReservation(
    @Param('uuid') uuid: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const newStatus = updateReservationDto.state
      const updatedReservation = await this.reservationService.updateReservation(uuid, newStatus );
      

      if (!updatedReservation) {
        throw new NotFoundException('La reserva no fue encontrada');
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Reserva actualizada exitosamente',
        data: updatedReservation, 
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('La reserva no fue encontrada'); 
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException('La solicitud es inválida');
      }
      throw new InternalServerErrorException('Error al actualizar la reserva.', error.message);
    }
  }


  // COMENTO ESTA FUNCION MOMENTANEAMENTE, PORQUE HAY QUE MODIFICAR LA ENTIDAD RESERVATIONS
  //PARA QUE ACEPTE UNA COLUMNA TIPO "isActive" PARA MANEJAR LA ELIMINACIÓN LÓGICA
  // @Delete('reservation/delete/:uuid')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(IRol.Admin)
  // async deleteReservation(@Param('uuid') uuid: string) {
  //   try {
  //     const result = await this.reservationService.deleteReservation(uuid);
  //     return {
  //       statusCode: HttpStatus.OK,
  //       message: 'Reserva eliminada exitosamente',
  //       data: result, 
  //     };
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException('La reserva no fue encontrada');
  //     } else if (error instanceof BadRequestException) {
  //       throw new BadRequestException('La solicitud es inválida');
  //     }
  //     throw new InternalServerErrorException('Error al eliminar la reserva.', error.message);
  //   }
  //}


  
  @Get('allUsers')
  @UseGuards(AuthGuard, RolesGuard) 
  @Roles(IRol.Admin)
  @HttpCode(200)
  async getAllUsers(
      @Query('page') page: number, 
      @Query('limit') limit: number
  ) {
      try {
          const users = await this.userService.getAllUsers(page, limit);
          return users;
      } catch (error) {
          if (error instanceof NotFoundException) {
              throw new NotFoundException(error.message);
          }
          throw new InternalServerErrorException('Error al obtener todos los usuarios.', error.message);
      }
  }
  
  @Put('bannUser/:uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(IRol.Admin)
  async bannUser(
      @Param('uuid', UuidValidationPipe) uuid: string
  ) {
      try {
          await this.userService.bannUser(uuid); 
          
          return {
              statusCode: HttpStatus.OK,
              message: 'Usuario baneado exitosamente',
          };
      } catch (error) {
          if (error instanceof NotFoundException) {
              throw new NotFoundException(error.message);
          }
          throw new InternalServerErrorException('Error al banear al usuario.', error.message);
      }
  }
}
  
  
