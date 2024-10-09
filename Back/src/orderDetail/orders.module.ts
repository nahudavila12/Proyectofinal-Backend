import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetail } from "src/orderDetail/orderDetail.entity";
import { Room } from "src/rooms/room.entity";
import { User } from "src/users/user.entity";
import { OrderDetailRepository } from "./orderDetail.repository";

@Module({
    imports: [TypeOrmModule.forFeature([OrderDetail])],
    controllers: [],
    providers: [OrderDetailRepository],
    exports: [OrderDetailRepository]
})

export class OrdersModule {}