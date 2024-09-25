import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';

//CHECK
import {
  CreateReservationDto,
  UpdateReservationDto,
} from 'src/dtos/createReservation.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { IRol } from 'src/users/user.entity';
import { IsUrl } from 'class-validator';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  createReservation(
    @Body() createReservationDto: CreateReservationDto,
    @Param('userId') userId: string,
  ) {
    return this.reservationService.createReservation(
      createReservationDto,
      userId,
    );
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
