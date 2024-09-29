import { 
    Body,
    Controller, 
    Post,
    UseInterceptors,
    UploadedFile,
    InternalServerErrorException,
    ConflictException
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { EmailService } from '../email/services/email/email.service';
import { Template } from 'src/email/enums/template.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UserService,
        private readonly emailService: EmailService
    ) {}

    @Post('addUser')
    @UseInterceptors(FileInterceptor('file'))
    async addUser(
        @Body() newUser: CreateUserDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        try {
            const user = await this.userService.addUser(newUser, file);

            const emailSent = await this.emailService.sendEmail({
                from: "mekhi.mcdermott@ethereal.email",
                subjectEmail: "Te damos la bienvenida a Nuestro Sitio",
                sendTo: newUser.email,
                template: Template.WELCOME,
                params: {
                    name: newUser.firstName
                }
            });

            if (!emailSent) {
                throw new InternalServerErrorException('Error al enviar el correo de bienvenida.');
            }

            return user;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw new ConflictException(error.message);
            }
            throw new InternalServerErrorException('Error al agregar el usuario.', error.message);
        }
    }
}
