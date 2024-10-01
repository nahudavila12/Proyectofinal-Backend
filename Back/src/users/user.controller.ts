import { 
    Body,
    Controller, 
    Post,
    Get,
    Put,
    Delete,
    HttpCode,
    Param,
    UseInterceptors,
    UploadedFile,
    InternalServerErrorException,
    ConflictException,
    Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { EmailService } from '../email/services/email/email.service';
import { Template } from 'src/email/enums/template.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { UuidValidationPipe } from './pipe/uuid-validation.pipe'; 

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

    @Get('allUsers')
    @HttpCode(200)
    async getAllUsers(
        @Query('page') page: number, 
        @Query('limit') limit: number
    ) {
        return this.userService.getAllUsers(page, limit);
    }

    @Get(':uuid')
    async getUser(
        @Param('uuid', UuidValidationPipe) uuid: string
    ) {
        return this.userService.findByEmail(uuid);
    }

    @Put('bannUser/:uuid')
    async bannUser(
        @Param('uuid', UuidValidationPipe) uuid: string
    ) {
        return await this.userService.bannUser(uuid);
    }

    @Delete('delete/:id')
    async deleteUser(
        @Param('id', UuidValidationPipe) id: string
    ) {
        return await this.userService.deleteUser(id);
    }
}
