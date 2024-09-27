import { 
    Body,
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    Param, 
    Post,
    Put 
} from '@nestjs/common';
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

    const user = await this.userService.addUser(newUser);


    const emailSent = await this.emailService.sendEmail({
        from: "mekhi.mcdermott@ethereal.email", 
        subjectEmail: "Te damos la bienvenida a Nuestro Sitio", 
        sendTo: newUser.email, 
        template: Template.WELCOME, 
        params: {
            name: newUser.name 
        }
    });


    if (!emailSent) {
        throw new Error('Error al enviar el correo de bienvenida.');
    }

    return user; 
  
      @Put('bannUser/:uuid')
    async bannUser(
        @Param('uuid', UuidValidationPipe) uuid: string
    ){
        return await this.userService.bannUser(uuid)
    }
}



    @Delete('delete/:uuid')
    deleteUser(@Param('id', UuidValidationPipe) id: string) {
        return await this.userService.deleteUser(id);

      }
}

