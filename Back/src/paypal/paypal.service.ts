import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as paypal from '@paypal/checkout-server-sdk';
import client from 'src/config/paypal.config';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { IState, Payment } from 'src/payments/payment.entity';
import { Reservation } from 'src/reservations/reservation.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { IStateBooking } from 'src/reservations/reservation.entity';
import { IRoomState, Room } from 'src/rooms/room.entity';

@Injectable()
export class PaypalService {
  private client: paypal.core.PayPalHttpClient;
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRespository: Repository<OrderDetail>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>
  ){
    this.client = client;
  }

  async createOrder(
    orderDetailUuid: string, 
    currency: string, 
    userUuid: string
  ) {
    
    const [foundUser, orderDetail] = await Promise.all([
      this.userRepository.findOneBy({uuid:userUuid}),
      this.orderDetailRespository.findOneBy({ uuid: orderDetailUuid })])

      if(!foundUser) throw new NotFoundException('Usuario no encontrado')
      if(!orderDetail) throw new NotFoundException('Orden no encontrada')
      
    const totalAmount = orderDetail.total.toFixed(2);

    const request = new paypal.orders.OrdersCreateRequest();
      request.prefer('return=representation');
      request.requestBody({
      intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: totalAmount,
            },
            description: `Orden de pago para el usuario: ${foundUser.user_name}, email: ${foundUser.email},
            numero de orden ${orderDetail.uuid}`
          },
        ],
      });

    try {
      const response = await this.client.execute(request);
      const approvalUrl = response.result.links.find(link => link.rel === 'approve').href;

      return { approvalUrl };
    
    } catch (error) {
      if (error instanceof NotFoundException)

      throw new Error(`Error creating PayPal order: ${error.message}`);
    }
  }

  async captureOrder(
    userUuid: string,
     orderId: string, 
     orderDetailUuid: string, 
     reservationUuid: string,
     roomUuid: string
    ) {
    
    const [foundUser, orderDetail, reservation, room] = await Promise.all([ 
      this.userRepository.findOneBy({uuid: userUuid}),
      this.orderDetailRespository.findOneBy({uuid: orderDetailUuid}),
      this.reservationRepository.findOneBy({uuid: reservationUuid}),
      this.roomRepository.findOneBy({uuid: roomUuid})
      ])

      if(!foundUser)throw new NotFoundException('Usuario no encontrado')
      if(!orderDetail)throw new NotFoundException('Orde no encontrada')
      if(!reservation)throw new NotFoundException('Reserva no encontrada')
      if(!room)throw new NotFoundException('Cuarto no encontrado')
        
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const response = await this.client.execute(request)
              if (response.result.status === 'COMPLETED'){
        
          const payment = new Payment()
          payment.date = new Date
          payment.total = parseFloat(response.result.purchase_units[0].amount.value);
          payment.state = IState.Successful
          payment.orderDetail = orderDetail
          payment.reservation = reservation
          payment.user = foundUser

            await this.paymentRepository.save(payment);
          
          reservation.state = IStateBooking.ACTIVE;
          room.disponibility = IRoomState.Occupied
            await this.reservationRepository.save(reservation)
            await this.roomRepository.save(room)
            
      return response.result;

      }else if (response.result.status === 'FAILED') {
        reservation.state = IStateBooking.CANCELLED
        throw new ConflictException('El pago fue rechazado');
      
      }else if (response.result.status === 'FAILED'){
        reservation.state = IStateBooking.PENDING;

      return {
        message: 'El pago está pendiente. Te notificaremos cuando se complete.',
        status: 'PENDING'
      } 
    }
      
    }catch (error) {
      
      if(
        error instanceof NotFoundException ||
        error instanceof ConflictException
      )

      throw new Error(`Error capturing PayPal payment: ${error.message}`);
    }
  }
}
  

