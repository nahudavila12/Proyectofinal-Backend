import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { OrderRepository } from "./orders.repository";
import { Orders } from "./order.entity";
import { OrderDetail } from "src/orderDetails/orderDetail.entity";
import { Room } from "src/rooms/room.entity";
import { User } from "src/users/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Orders, OrderDetail, Room, User])],
    controllers: [OrdersController],
    providers: [OrdersService, OrderRepository],
})

export class OrdersModule {}