// src/payments/paypal.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as paypal from '@paypal/checkout-server-sdk';
import client from 'src/Config/paypal.config';
import { OrderDetail } from 'src/orderDetail/orderDetail.entity';
import { Payment } from 'src/payments/payment.entity';
import {
  IStateBooking,
  Reservation,
} from 'src/reservations/reservation.entity';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Room } from 'src/rooms/room.entity';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as qs from 'qs';
import { config as dotenvConfig } from 'dotenv';
import { ReservationService } from 'src/reservations/reservation.service';
import { OrderDetailRepository } from 'src/orderDetail/orderDetail.repository';
import { EmailService } from 'src/email/services/email/email.service';
import { Template } from 'src/email/enums/template.enum';

@Injectable()
export class PaypalService {
  private client: paypal.core.PayPalHttpClient;
  httpService: HttpService;

  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderDetailRespository: Repository<OrderDetail>,
    private readonly orderDetailRepository: OrderDetailRepository,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly reservationService: ReservationService,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    private readonly emailService: EmailService // Inyección del servicio de correo
  ) {
    this.client = client;
  }

  async createOrder(paymentUuid: string, currency: string): Promise<any> {
    let paymentOrder = await this.paymentRepository.findOneBy({
      uuid: paymentUuid,
    });
    if (!paymentOrder)
      throw new NotFoundException('Orden de pago no encontrada');

    let amountValue = paymentOrder.total;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');

    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amountValue,
          },
          reference_id: paymentOrder.uuid,
        },
      ],
      application_context: {
        return_url: `http://localhost:3000/?paymentOrder=${paymentOrder.uuid}`,
        cancel_url: 'http://tu-aplicacion.com/paypal/cancel',
      },
    });

    try {
      const order = await this.client.execute(request);

      paymentOrder.orderId = order.result.id;
      await this.paymentRepository.save(paymentOrder);

      return order.result.links.find((link) => link.rel === 'approve').href;
    } catch (err) {
      throw new Error(`Error al crear la orden de PayPal: ${err.message}`);
    }
  }

  async captureOrder(
    token: string,
    payerId: string,
    paymentUuid: string,
  ): Promise<any> {
    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({
      payer_id: payerId,
    });

    const order = await this.client.execute(request);
    const founPayment = await this.paymentRepository.findOne({
      where: { uuid: paymentUuid },
      relations: ['reservation', 'orderDetail'],
    });

    if (!founPayment) throw new NotFoundException('Orden no hallada');

    const reservation = await this.reservationRepository.findOne({
      where: { uuid: founPayment.reservation.uuid },
      relations: ['payment'],
    });
    if (!reservation) throw new NotFoundException('Reserva no encontrada');

    const orderDetail = await this.orderDetailRespository.findOne({
      where: { uuid: founPayment.reservation.uuid },
      relations: ['payment'],
    });
    if (!orderDetail)
      throw new NotFoundException('Orden de compra no encontrada');

    try {
      if (order.result.status === 'COMPLETED') {
        founPayment.total =
          order.result.purchase_units[0].payments.captures[0].amount.value;
        founPayment.currency =
          order.result.purchase_units[0].payments.captures[0].amount.currency_code;
        founPayment.payerEmail =
          order.result.payment_source.paypal.email_address;
        founPayment.status =
          order.result.purchase_units[0].payments.captures[0].status;
        founPayment.payerId = order.result.payer.payer_id;

        const actualReservation =
          await this.reservationService.updateReservation(
            reservation.uuid,
            IStateBooking.ACTIVE,
          );
        const actualOrderDetail =
          await this.orderDetailRepository.activeOrderDetailStatus(
            orderDetail.uuid,
            order.result.status,
          );

        await this.paymentRepository.save(founPayment);

        // Envío de correo tras la captura del pago
        const emailSent = await this.emailService.sendEmail({
          from: 'mekhi.mcdermott@ethereal.email',
          subjectEmail: 'Confirmación de Pago',
          sendTo: founPayment.payerEmail, // Email del pagador
          template: Template.PAYPAL_PAYMENT,
          params: {
            name: reservation.user.user_name, // Asumiendo que el usuario está relacionado con la reserva
            amount: founPayment.total,
            transactionId: order.result.id,
            date: new Date().toLocaleDateString(), // Formato de fecha deseado
          },
        });

        if (!emailSent) {
          throw new ConflictException('Error al enviar el correo de confirmación.');
        }

        return {
          message: 'Pago capturado y registro creado.',
          reservationUuid: actualReservation.uuid,
          reservationStatus: actualReservation.status,
          paymentStatus: founPayment.status,
        };
      }

      if (order.result.status === 'DECLINED') {
        founPayment.status = 'DECLINED';

        const actualReservation =
          await this.reservationService.updateReservation(
            reservation.uuid,
            IStateBooking.CANCELLED,
          );
        const actualOrderDetail =
          await this.orderDetailRepository.activeOrderDetailStatus(
            orderDetail.uuid,
            order.result.status,
          );

        await this.paymentRepository.save(founPayment);

        return {
          message: 'Pago rechazado',
          reservationUuid: actualReservation.uuid,
          reservationStatus: actualReservation.status,
          paymentStatus: founPayment.status,
        };
      }
    } catch (err) {
      throw new Error(`Error al capturar la orden de PayPal: ${err.message}`);
    }
  }
}
