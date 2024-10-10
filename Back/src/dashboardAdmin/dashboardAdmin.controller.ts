import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateOwnerDto } from 'src/dtos/createOwner.dto';
import { UpdateReservationDto } from 'src/dtos/createReservation.dto';
import { Template } from 'src/email/enums/template.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/guards/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { OwnerService } from 'src/owners/owner.service';
import { PropertyService } from 'src/properties/property.service';
import { ReservationService } from 'src/reservations/reservation.service';
import { UuidValidationPipe } from 'src/users/pipe/uuid-validation.pipe';
import { IRol } from 'src/users/user.entity';
import { UserService } from 'src/users/user.service';
import { EmailService } from 'src/email/services/email/email.service';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
export class AdminController {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly propertyService: PropertyService,
    private readonly reservationService: ReservationService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
  ) {}

  @Post('addOwner/:uuid')
  @Roles(IRol.User, IRol.Admin)
  @ApiOperation({ summary: 'Agregar un nuevo propietario' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID del usuario propietario',
    type: 'string',
  })
  @ApiBody({
    type: CreateOwnerDto,
    description: 'Datos para crear el nuevo propietario',
  })
  @ApiResponse({
    status: 201,
    description: 'Propietario agregado exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async addOwner(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() newOwner: CreateOwnerDto,
  ) {
    try {
      const owner = await this.ownerService.addOwner(uuid, newOwner);
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

  @Patch('propertie/ban/:uuid')
  @Roles(IRol.Admin)
  @ApiOperation({ summary: 'Banear o reactivar una propiedad' })
  @ApiParam({
    name: 'uuid',
    description: 'UUID de la propiedad',
    type: 'string',
  })
  @ApiBody({
    schema: { type: 'object', properties: { ban: { type: 'boolean' } } },
    description: 'Indicar si se banea o reactiva la propiedad',
  })
  @ApiResponse({
    status: 200,
    description: 'Propiedad baneada o reactivada exitosamente',
  })
  @ApiResponse({ status: 404, description: 'Propiedad no encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async banProperty(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body('ban') ban: boolean,
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
      throw new InternalServerErrorException(
        'Hubo un problema al banear o reactivar la propiedad',
      );
    }
  }

  @Get('reservation/all')
  @Roles(IRol.Admin)
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({ status: 200, description: 'Reservas obtenidas exitosamente' })
  @ApiResponse({ status: 404, description: 'No se encontraron reservas' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
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
      throw new InternalServerErrorException(
        'Error al obtener las reservas.',
        error.message,
      );
    }
  }

  @Patch('reservation/update:uuid')
  @Roles(IRol.Admin)
  @ApiOperation({ summary: 'Actualizar estado de una reserva' })
  @ApiParam({ name: 'uuid', description: 'UUID de la reserva', type: 'string' })
  @ApiBody({
    type: UpdateReservationDto,
    description: 'Estado actualizado de la reserva',
  })
  @ApiResponse({ status: 200, description: 'Reserva actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'La reserva no fue encontrada' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async updateReservation(
    @Param('uuid') uuid: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    try {
      const updatedReservation =
        await this.reservationService.updateReservation(
          uuid,
          updateReservationDto.state,
        );
      if (!updatedReservation) {
        throw new NotFoundException('La reserva no fue encontrada');
      }


      const userEmail = updatedReservation.user.email;
    // Enviar notificación por correo
    await this.emailService.sendEmail({
      from: "mekhi.mcdermott@ethereal.email",
      subjectEmail: "Actualización de Reserva",
      sendTo: userEmail,
      template: Template.UPDATE_RESERVATION, 
      params: {
        name: updatedReservation.user.firstName, 
        reservationId: updatedReservation.uuid,
        updatedDetails: JSON.stringify(updatedReservation), 
      },
    });

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
      throw new InternalServerErrorException(
        'Error al actualizar la reserva.',
        error.message,
      );
    }
  }

  @Get('allUsers')
  @Roles(IRol.Admin)
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    description: 'Número de la página',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    description: 'Número de elementos por página',
    required: false,
  })
  @ApiResponse({ status: 200, description: 'Usuarios obtenidos exitosamente' })
  @ApiResponse({ status: 500, description: 'Error al obtener los usuarios' })
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    try {
      const users = await this.userService.getAllUsers(page, limit);
      return users;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener todos los usuarios.',
        error.message,
      );
    }
  }

  @Put('bannUser/:uuid')
  @Roles(IRol.Admin)
  @ApiOperation({ summary: 'Banear un usuario por UUID' })
  @ApiParam({ name: 'uuid', description: 'UUID del usuario', type: 'string' })
  @ApiResponse({ status: 200, description: 'Usuario baneado exitosamente' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async bannUser(@Param('uuid', UuidValidationPipe) uuid: string) {
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
      throw new InternalServerErrorException(
        'Error al banear al usuario.',
        error.message,
      );
    }
  }
}
