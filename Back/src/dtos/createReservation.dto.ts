import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ example: '2024-09-20T15:00:00Z' })
  checkIn: Date;

  @ApiProperty({ example: '2024-09-25T11:00:00Z' })
  checkOut: Date;

  @ApiProperty({ example: '1', description: 'ID de la habitación' })
  roomId: string;
}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiProperty({ example: 'active', enum: ['active', 'pending', 'cancelled'] })
  state: string;
}
