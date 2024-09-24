
import { ApiProperty } from "@nestjs/swagger";
import { OrderDetail } from "src/orderDetails/orderDetail.entity";
import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Orders {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        description: 'Debe ser una fecha del tipo dd/mm/yyyy',
        example: '01/01/2022',
    })
    @Column()
    date: Date;

    @ApiProperty({
        type: () => [OrderDetail],
        description: 'Detalle del pedido' })
    @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.orders)
    orderDetails: OrderDetail;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({name: 'user_id'})
    user: User;
}