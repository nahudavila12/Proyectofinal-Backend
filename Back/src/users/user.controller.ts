import { 
    Controller, 
    Get,
    Delete,
    Param,
    InternalServerErrorException,
    UseGuards,
    HttpStatus,
    NotFoundException
} from '@nestjs/common';
import { UuidValidationPipe } from './pipe/uuid-validation.pipe'; 
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard,RolesGuard)
export class UsersController {
    constructor(
        private readonly userService: UserService,
    ) {}



    @Get(':uuid')
    @UseGuards(AuthGuard)
    async getUser(
        @Param('uuid', UuidValidationPipe) uuid: string
    ) {
        try {
            const user = await this.userService.findByEmail(uuid);
            
            if (!user) {
                throw new NotFoundException('Usuario no encontrado');
            }
            return user;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException('Error al obtener el usuario.', error.message);
        }
    }




    @Delete('delete/:id')
    @UseGuards(AuthGuard)
    async deleteUser(
        @Param('uuid', UuidValidationPipe) uuid: string
    ) {
        try {
            await this.userService.deleteUser(uuid); 
            return {
                statusCode: HttpStatus.OK,
                message: 'Usuario eliminado exitosamente',
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(error.message);
            }
            throw new InternalServerErrorException('Error al eliminar el usuario.', error.message);
        }
    }



}
