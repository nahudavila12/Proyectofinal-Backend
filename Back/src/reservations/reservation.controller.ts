import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  ParseUUIDPipe,
  ConflictException,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
} from '../dtos/createReservation.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('addReservation/:uuid')
  @UseGuards(AuthGuard,RolesGuard)
  async addReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Param('uuid', ParseUUIDPipe) userId: string,
  ) {
    try {
      const reservation = await this.reservationService.addReservation(createReservationDto, userId);
      return reservation;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException('El usuario no fue encontrado'); 
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException('Los datos proporcionados son inválidos');
      }
      throw new InternalServerErrorException('Error al agregar la reserva.', error.message);
    }
  }

  @Get('user/:userId')
  @UseGuards(AuthGuard, RolesGuard)
  async getUserReservations(@Param('userId') userId: string) {
    try {
      const reservations = await this.reservationService.getUserReservations(userId);
  
      if (!reservations || reservations.length === 0) {
        throw new NotFoundException('No se encontraron reservas para este usuario');
      }
  
      return {
        statusCode: HttpStatus.OK,
        message: 'Reservas del usuario obtenidas exitosamente',
        data: reservations, 
      };
    } catch (error) {

      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message); 
      }
      throw new InternalServerErrorException('Error al obtener las reservas del usuario.', error.message);
    }
  }
  
  
}
