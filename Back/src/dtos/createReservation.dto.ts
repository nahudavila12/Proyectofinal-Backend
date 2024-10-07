import { IsNotEmpty, IsNumber, IsDateString, Min, IsString, Matches, IsDate } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IStateBooking } from 'src/reservations/reservation.entity';

export class CreateReservationDto {

  @IsNotEmpty({ message: 'El alojamiento es obligatorio' })
  @IsString({message: 'Tipo de dato no válido'})
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i , 
    {message: 'Usuario no válido'}
)
  propertyId: string; 

  @IsNotEmpty({ message: 'El numero de habitación obligatorio' })
  @IsString({message: 'Tipo de dato no válido'})
  @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i , 
    {message: 'Habitacion no válida'}
)
  roomId: string;

  @IsNotEmpty({ message: 'La fecha de entrada es obligatoria' })
  @IsDateString()
  checkin: Date; 

  @IsNotEmpty({ message: 'La fecha de salida es obligatoria' })
  @IsDateString()
  checkout: Date;  

}

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiProperty({ example: 'active', enum: ['active', 'pending', 'cancelled'] })
  state: IStateBooking;
}
