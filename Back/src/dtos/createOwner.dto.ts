import { IsString, IsEmail, Length, IsNotEmpty } from "class-validator"

export class CreateOwnerDto{

    @IsNotEmpty({message: 'campo obligatorio'})
    @IsString()
    @Length(4, 40, {message: 'el nombre ingresado no tiene los suficientes carácteres o excede el límite '})
    bussines_name: string;

    @IsNotEmpty({message: 'campo obligatorio'})
    @IsString()
    bussinesId: string;

    @IsNotEmpty({message: 'campo obligatorio'})
    phone: string;

    @IsNotEmpty({message: 'campo obligatorio'})
    @IsEmail()
    @Length(6, 20, {message: 'el mail ingresado no tiene los suficientes carácteres o excede el límite '})
    email: string;
}