import { 
  BadRequestException,
  ConflictException, 
  Injectable, 
  NotFoundException } 
  from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { 
  LessThan, 
  MoreThan, 
  Repository , 
  DataSource} 
  from 'typeorm';
import { 
  Reservation 
} from './reservation.entity';
import {
  CreateReservationDto,
  UpdateReservationDto,
} from 'src/dtos/createReservation.dto';
import { User } from 'src/users/user.entity';
import { Room } from 'src/rooms/room.entity';
import { Property } from 'src/properties/property.entity';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { CreateOrderDetailDto } from 'src/dtos/createOrderDetail.dto';
import { AdditionalService } from 'src/additionalsServices/additionalService.entity';
import { IRoomState } from 'src/rooms/room.entity';

export class CodeReservation {
  code: string;
  checkin: Date;
  checkout: Date;
  state: string
}


@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(User)
    private readonly userRepositorio: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailRepository: Repository<OrderDetail>,
    @InjectDataSource()
    private readonly dataSource: DataSource
  ) {}
  
  async addReservation(newReservation: CreateReservationDto,userId: string,): Promise<CodeReservation | null> {
    
    const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect()
      await queryRunner.startTransaction()
    
    try{

      const { 
        propertyId, 
        roomId,
        checkin,
        checkout
      } = newReservation;
    
      let total = 0;
    
      const foundUser = await this.userRepositorio.findOneBy({uuid: userId})
        if(!foundUser) throw new NotFoundException('Usuario no encontrado');
      
      const foundProperty = await this.propertyRepository.findOneBy({uuid: propertyId})
        if(!foundProperty) throw new NotFoundException('Propiedad no encontrada');
        
        const foundRoom = await queryRunner.manager.findOne(Room, {
          where: { uuid: roomId },
          lock: { mode: 'pessimistic_write' }, 
        });  

        if(!foundRoom) throw new NotFoundException('Habitación no encontrada');
    
        if (foundRoom.disponibility !== 'available') {
          throw new ConflictException('La habitación no está disponible');
        }
        
      const existingReservation = await this.reservationRepository.findOne({
        where: {
          room: { uuid: roomId },
          checkin: LessThan(checkout),
          checkout: MoreThan(checkin)  
        },
      });
        if(existingReservation) throw new ConflictException('Fechas de reserva no disponibles')
      
      const addReservation = new Reservation()
      addReservation.checkin = newReservation.checkin
      addReservation.checkout = newReservation.checkout
      addReservation.room = foundRoom
      addReservation.user = foundUser
      
      const savedReservation = await queryRunner.manager.save(Reservation,addReservation)

      const pricePerDay = foundRoom.price_per_day; 
      const checkinDate = new Date(newReservation.checkin);
      const checkoutDate = new Date(newReservation.checkout);
      const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
      const numberOfNights = timeDiff / (1000 * 3600 * 24); 
        if (numberOfNights <= 0) throw new BadRequestException('Las fechas de check-in y check-out son inválidas');
      
      total = numberOfNights * pricePerDay;
      
      const newOrderDetail: CreateOrderDetailDto = { 
        date: new Date(),
        room_total: total,
        total: total,
        reservation: savedReservation,
        user: foundUser
      }
      
      await queryRunner.manager.save(OrderDetail, newOrderDetail);
      
      await queryRunner.commitTransaction();

    return {
      code: savedReservation.uuid,
      checkin: savedReservation.checkin,
      checkout: savedReservation.checkout,
      state: savedReservation.state
    } as CodeReservation;
    
    }catch (error) {
      if (error instanceof BadRequestException || 
        error instanceof NotFoundException || 
        error instanceof ConflictException)
      {
        throw error;
      }
      
    await queryRunner.rollbackTransaction();
    
    throw { 
      message: `La habitación no se encuentra disponible. Lamentamos las molestias ocasionadas ${error}`
    };
  
  } finally {
   
    await queryRunner.release();
  }
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
