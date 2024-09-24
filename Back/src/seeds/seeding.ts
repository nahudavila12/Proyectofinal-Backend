import { Connection } from 'typeorm';
import { User, IRol } from '../users/user.entity';
import { Owner } from '../owners/owner.entity';
import { Property, PropertyType } from '../propierties/property.entity';
import { Room } from '../rooms/room.entity';
import { RoomCategory } from 'src/rooms/roomCategory.entity';
import { ICategories } from 'src/rooms/roomCategory.entity';
import { Reservation } from '../reservations/reservation.entity';
import { Payment } from '../payments/payment.entity';
import { OrderDetail } from '../orderDetails/orderDetail.entity';
import { IState } from '../payments/payment.entity';

export async function seedDatabase(connection: Connection) {
  // Crear usuarios
  const user1 = new User();
  user1.name = 'John Doe';
  user1.email = 'john@example.com';
  user1.birthday = new Date('1990-01-01');
  user1.phone = '123456789';
  user1.address = '123 Main St';
  user1.password = 'password123';
  user1.rol = IRol.User;

  const user2 = new User();
  user2.name = 'Jane Smith';
  user2.email = 'jane@example.com';
  user2.birthday = new Date('1985-05-05');
  user2.phone = '987654321';
  user2.address = '456 Market St';
  user2.password = 'securepassword';
  user2.rol = IRol.Admin;

  // Guardar usuarios
  await connection.getRepository(User).save([user1, user2]);

  // Crear propietario
  const owner1 = new Owner();
  owner1.bussines_name = 'John Doe Hotels';
  owner1.user = user1;

  // Guardar propietario
  await connection.getRepository(Owner).save(owner1);

  // Crear propiedad
  const property1 = new Property();
  property1.name = 'Hotel California';
  property1.location = 'Some Beach, CA';
  property1.propertyType = PropertyType.HOTEL;
  property1.owner = owner1;

  // Guardar propiedad
  await connection.getRepository(Property).save(property1);

  // Crear habitación
  const roomCategory = new RoomCategory();
  roomCategory.name = ICategories.STANDARD;
  
  const savedRoomCategory = await this.roomCategoryRepository.save(roomCategory);

  const room1 = new Room();
  room1.room_number = 101;
  room1.category = savedRoomCategory;
  room1.capacity = 2;
  room1.price_per_day = 150.0;
  room1.property = property1;

  // Guardar habitación
  await connection.getRepository(Room).save(room1);

  // Crear reservación
  const reservation1 = new Reservation();
  reservation1.checkIn = new Date('2024-09-20');
  reservation1.checkOut = new Date('2024-09-25');
  reservation1.user = user1;
  reservation1.room = room1;

  // Guardar reservación
  await connection.getRepository(Reservation).save(reservation1);

  // Crear detalle del pedido
  const orderDetail1 = new OrderDetail();
  orderDetail1.date = new Date();
  orderDetail1.room_total = 750.0;
  orderDetail1.total = 750.0;
  orderDetail1.reservation = reservation1;

  // Guardar detalle del pedido
  await connection.getRepository(OrderDetail).save(orderDetail1);

  // Crear pago
  const payment1 = new Payment();
  payment1.date = new Date();
  payment1.state = IState.Pending;
  payment1.method = 'credit card';
  payment1.orderDetail = orderDetail1;

  // Guardar pago
  await connection.getRepository(Payment).save(payment1);

  console.log('SEEDING SUCCESSFULL');
}

///comentario
