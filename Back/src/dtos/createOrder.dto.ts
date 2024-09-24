import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";


export class CreateOrderDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsArray()
    @ArrayMinSize(1)
    roomId: string;
    
    @IsNotEmpty()
    days: string;
}