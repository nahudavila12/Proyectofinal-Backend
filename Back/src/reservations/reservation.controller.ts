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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from '../dtos/createReservation.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { IRol } from 'src/users/user.entity';
import { Reservation } from './reservation.entity';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('addReservation/:uuid')
  /* @UseGuards(AuthGuard, RolesGuard) */
  @ApiOperation({ summary: 'Crear una nueva reserva para un usuario' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario que realiza la reserva',
    type: 'string',
  })
  @ApiBody({ type: CreateReservationDto })
  @ApiResponse({
    status: 201,
    description: 'Reserva creada con éxito',
    type: Reservation,
  })
  @ApiResponse({
    status: 400,
    description: 'Los datos proporcionados son inválidos',
  })
  @ApiResponse({ status: 409, description: 'Conflicto al crear la reserva' })
  @ApiResponse({ status: 404, description: 'El usuario no fue encontrado' })
  async addReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Param('uuid', ParseUUIDPipe) userId: string,
  ) {
    try {
      const reservation = await this.reservationService.addReservation(
        createReservationDto,
        userId,
      );
      return reservation;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      } else if (error instanceof NotFoundException) {
        throw new NotFoundException('El usuario no fue encontrado');
      } else if (error instanceof BadRequestException) {
        throw new BadRequestException('Los datos proporcionados son inválidos');
      }
      throw new InternalServerErrorException(
        'Error al agregar la reserva.',
        error.message,
      );
    }
  }

  @Get('admin/all')
/*   @UseGuards(RolesGuard) */
/*   @Roles(IRol.Admin) */
  @ApiOperation({ summary: 'Obtener todas las reservas (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las reservas',
    type: [Reservation],
  })
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  @Get('user/:userId')
/*   @UseGuards(AuthGuard, RolesGuard) */
  @ApiOperation({
    summary: 'Obtener todas las reservas de un usuario específico',
  })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas del usuario obtenida exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron reservas para este usuario',
  })
  async getUserReservations(@Param('userId') userId: string) {
    try {
      const reservations =
        await this.reservationService.getUserReservations(userId);

      if (!reservations || reservations.length === 0) {
        throw new NotFoundException(
          'No se encontraron reservas para este usuario',
        );
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
      throw new InternalServerErrorException(
        'Error al obtener las reservas del usuario.',
        error.message,
      );
    }
  }
}
