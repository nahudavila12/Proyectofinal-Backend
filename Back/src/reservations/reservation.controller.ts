import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from '../dtos/createReservation.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { IRol } from 'src/users/user.entity';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post('addReservation/:uuid')
  async addReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Param('uuid', ParseUUIDPipe) userId: string,
  ) {
    return await this.reservationService.addReservation(createReservationDto, userId);
  }

  @Get('user/:userId')
  getUserReservations(@Param('userId') userId: string) {
    return this.reservationService.getUserReservations(userId);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles(IRol.Admin)
  getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  @Patch('admin/:uuid')
  @UseGuards(RolesGuard)
  @Roles(IRol.Admin)
  updateReservation(
    @Param('uuid') uuid: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationService.updateReservation(
      uuid,
      updateReservationDto,
    );
  }

  @Delete('admin/:uuid')
  @UseGuards(RolesGuard)
  @Roles(IRol.Admin)
  deleteReservation(@Param('uuid') uuid: string) {
    return this.reservationService.deleteReservation(uuid);
  }
}
