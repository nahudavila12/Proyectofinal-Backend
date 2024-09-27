import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { UuidValidationPipe } from './pipe/uuid-validation.pipe';
import { EmailService } from '../email/services/email/email.service'
import { Template } from 'src/email/enums/template.enum';

@Controller('user')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService
    ){}

    @Get('allUsers')
    @HttpCode(200)
    async getAllUsers(page,limit){
        return this.userService.getAllUsers(page,limit)
    }

    getUser(@Param('uuid', UuidValidationPipe) uuid: string) {
        return this.userService.findByEmail(uuid);
      }

      @Post('addUser')
async addUser(@Body() newUser: CreateUserDto) {
    // Agregar el usuario a la base de datos
    const user = await this.userService.addUser(newUser);

    // Envío de notificación vía email
    const emailSent = await this.emailService.sendEmail({
        from: "mekhi.mcdermott@ethereal.email", // Remitente
        subjectEmail: "Te damos la bienvenida a Nuestro Sitio", // Asunto
        sendTo: newUser.email, // Destinatario
        template: Template.WELCOME, // Aquí pasas el template
        params: {
            name: newUser.name // Parámetros para el template
        }
    });

    // Chequeo para ver si el correo se envió correctamente
    if (!emailSent) {
        throw new Error('Error al enviar el correo de bienvenida.');
    }

    return user; // Retornar el usuario creado
}



    @Delete('delete/:uuid')
    deleteUser(@Param('id', UuidValidationPipe) id: string) {
        return this.userService.deleteUser(id);
      }
}

