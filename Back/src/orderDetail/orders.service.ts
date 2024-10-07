import { Injectable } from "@nestjs/common";
import { OrderDetailRepository } from "../orderDetail/orderDetail.repository";

@Injectable()
export class OrdersService {
    constructor(private orderRepository: OrderDetailRepository) {}

    // createOrder(userId: string, roomId : any, days: string ){
    //     return this.orderRepository.createOrder(userId, roomId, days);
    //}
}