import { Module } from '@nestjs/common';
import { OwnerService } from 'src/owners/owner.service';
import { PropertyService } from 'src/properties/property.service';
import { ReservationService } from 'src/reservations/reservation.service';
import { UserService } from 'src/users/user.service';
import { AdminController } from './dashboardAdmin.controller';

@Module({
  imports: [],
  controllers: [AdminController],
  providers: [
    OwnerService,
    PropertyService,
    ReservationService,
    UserService,
  ],
})
export class DashboardAdminModule {}
