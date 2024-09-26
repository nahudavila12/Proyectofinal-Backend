import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from 'src/dtos/createReservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  async createReservation(
    createReservationDto: CreateReservationDto,
    userId: string,
  ) {
    const reservation = this.reservationRepository.create({
      ...createReservationDto,
      user: { uuid: userId },
    });
    return this.reservationRepository.save(reservation);
  }

  async getUserReservations(userId: string) {
    return this.reservationRepository.find({
      where: { user: { uuid: userId } },
    });
  }

  async getAllReservations() {
    return this.reservationRepository.find();
  }

  async updateReservation(
    uuid: string,
    updateReservationDto: UpdateReservationDto,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: { uuid },
    });
    if (!reservation)
      throw new NotFoundException(`Reservation with UUID ${uuid} not found`);

    Object.assign(reservation, updateReservationDto);
    return this.reservationRepository.save(reservation);
  }

  async deleteReservation(uuid: string) {
    const result = await this.reservationRepository.delete({ uuid });
    if (result.affected === 0)
      throw new NotFoundException(`Reservation with UUID ${uuid} not found`);
  }
}
