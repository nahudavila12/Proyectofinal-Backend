// import { Body, Controller,  Post } from "@nestjs/common";
// import { OrdersService } from "./orders.service";
// import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
// import { CreateOrderDto } from "src/dtos/createOrderDetail.dto";

// @ApiTags('Orders')
// @Controller('orders')
// @ApiBearerAuth()
// export class OrdersController {
//     constructor(private readonly orderService: OrdersService) {}

//     @Post()
//     createOrder(@Body() order: CreateOrderDto){
//         const { userId, roomId, days } = order;
//         return this.orderService.createOrder( userId, roomId, days);
//     }
// }