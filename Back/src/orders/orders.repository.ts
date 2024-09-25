import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/rooms/room.entity';
import { Repository } from 'typeorm';
import { Orders } from './order.entity';
import { User } from 'src/users/user.entity';
import { OrderDetail } from 'src/orderDetails/orderDetail.entity';


@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
    @InjectRepository(OrderDetail) private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createOrder(userId: string, roomId: string, days: string){
    const user = await this.usersRepository.findOneBy({uuid: userId});

    if (!user) throw new NotFoundException(`Usuario con id ${userId} not found`)
        
    const order = new Orders();
    order.date = new Date();
    order.user = user;

    const newOrder = await this.ordersRepository.save(order);
     
    const newRoom = await this.roomRepository.findOneBy({ uuid: roomId });

   
    if (!newRoom || newRoom.disponibility !== 'avaiable') new NotFoundException(`Habitacion con id ${roomId} no encontrada`)
            
    const totalRoomPrice = Number(newRoom.price_per_day) * Number(days);
    
    await this.roomRepository.update({ uuid: roomId }, { capacity: newRoom.capacity - 1 });

    const orderDetail = new OrderDetail();

    orderDetail.date = new Date();
    orderDetail.room_total = totalRoomPrice;
    orderDetail.total = totalRoomPrice;
    orderDetail.orders = newOrder;
    
    await this.orderDetailRepository.save(orderDetail);

    return await this.ordersRepository.find({
        where: { id: newOrder.id },
        relations: {
            orderDetails: true
        }
    })

  }
  
}