import { IsNotEmpty, IsUUID, IsOptional, IsDecimal, Min, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Reservation } from '../reservations/reservation.entity'; 
import { User } from 'src/users/user.entity';
import { Payment } from 'src/payments/payment.entity';

export class CreateOrderDetailDto {
    
@ApiProperty({
example: '2024-09-20T15:00:00Z',
description: 'Fecha de la orden',
})
@IsNotEmpty({ message: 'La fecha de la orden es requerida.' })
@IsDate({ message: 'La fecha debe ser una fecha válida.' })
date: Date;

@ApiProperty({
example: 'Hotel California',
description: 'Nombre de la propiedad reservada',
})
@IsNotEmpty({ message: 'El nombre de la propiedad es requerido' })
propertyName: string;

@ApiProperty({
description: 'Total del costo de la habitación',
  })
  @IsNotEmpty({ message: 'El total del costo de la habitación es requerido.' })
  @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: 'El total debe ser un número decimal con dos decimales.' })
  @Min(0, { message: 'El total del costo de la habitación debe ser mayor o igual a 0.' })
  room_total: number;

@ApiProperty({
description: 'Total de los servicios adicionales (opcional)',
nullable: true,
  })
    @IsOptional()
    @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: 'El total de servicios adicionales debe ser un número decimal con dos decimales.' })
@Min(0, { message: 'El total de servicios adicionales debe ser mayor o igual a 0.' })
  additionals_services_total?: number;

@ApiProperty({
    description: 'Total del pedido',
  })
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2', force_decimal: true }, { message: 'El total debe ser un número decimal con dos decimales.' })
  @Min(0)
  total: number;

  @ApiProperty({
    description: 'Reservación asociada con el detalle del pedido',
    type: Reservation,
  })
  @IsNotEmpty()
  reservation: Reservation;
  
  @ApiProperty({
    description: 'Reservación asociada con el usuario',
    type: Reservation,
  })
  @IsNotEmpty()
  user: User; 

  @ApiProperty({
    description: 'Pago asociado con el usuario',
    type: Reservation,
  })
  payment?: Payment; 
}
