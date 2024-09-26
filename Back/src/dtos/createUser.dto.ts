import { 
    IsEmail,
    IsNotEmpty,
    IsString,
    Length, 
    Matches,
    Validate,
    IsDateString,
    IsEmpty
}
 from "class-validator";
import { MatchPassword } from "../decorators/matchPassword.decorator";
import { AgeValidator } from "src/decorators/ageValidator";

export class CreateUserDto {
    /**
     * Debe ser un string entre 3 y 80 caracteres
     * @example 'Test User01'
     */
    @IsNotEmpty({ message: 'El nombre es requerido.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 80, { message: 'El nombre debe tener entre 3 y 80 caracteres.' })
    name?:string;
     
    /**
     * Debe ser un string y un email valido 
     * @example example@example.com
     */
    @IsNotEmpty({message:'El email es requerido'})
    @IsEmail()
    email?:string;

    /**
     * Debe ser un Date mayo de 18 años
     * @example 01-01-2006
     */
    @IsDateString({}, { message: 'La fecha debe estar en formato YYYY-MM-DD' })
    @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
    @Validate(AgeValidator, { message: 'Debe ser mayor de 18 años' })
    birthday?: Date;
    
    /**
     * Debe ser un string entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
     * @example 'Password123#'
     */
    @IsNotEmpty({message:'La contraseña es requerida'})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, 
    {
    message: 'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    })
    @Length(8, 15, { message: 'La contraseña debe tener entre 8 y 15 caracteres.' })
    password?:string;

    /**
     * Debe ser igual a la password 
     * @example 'Password123#'
     */
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword?:string;
    
    @IsEmpty()
    isAdmin?: boolean

    /**
     * Debe ser un string entre 3 y 80 caracteres
     * @example 'Direccion de calle 123'
     */
    @IsNotEmpty({ message: 'La direccion es requerido.' })
    @Length(3, 80, { message: 'La direccion debe tener entre 3 y 80 caracteres.' })
    address?:string;


    /**
     * Debe ser un numero entero valido de 10 digitos
     * @example '1234567890'
     */
    @IsNotEmpty({ message: 'El número de teléfono es requerido.' })
    @IsString({ message: 'El número de teléfono debe ser un número entero válido.' })
    @Length(9,15, { message: 'El número de teléfono debe ser un número válido de 10 dígitos.' }) 
    phone?: string;


    /**
     * Debe ser un string 
     * @example 'Argentina'
     */
    @IsNotEmpty({ message: 'El pais es requerido.' })
    @Length(3, 20, { message: 'El pais debe tener entre 5 y 20 caracteres.' })
    country?:string;


}